from flask import Flask, jsonify,request,session,Response,render_template
from flask_cors import CORS,cross_origin
from flask_bcrypt import Bcrypt
import cv2
import pandas as pd
import difflib
import pickle

# Import your pose detection and classification functions



from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


from models import db , User , Blog

 
# Initializing flask app
app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['SECRET_KEY'] = "yoga"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "siddhi"  # Change this!
jwt = JWTManager(app)


db.init_app(app)
 
with app.app_context():
    db.create_all()

# CORS(app,resources={r"/api/*":{"origins":"*"}})
CORS(app,supports_credentials=True)

data = pd.read_csv('C:/Users/Dell_Owner/Downloads/PersonalYogaAssitant-a878916b627606996f122081dff6bf7d858183b3/PersonalYogaAssitant/backendSd/yoga - Sheet1 (5).csv')



def load_model_components():
    """Loads the Asana recommendation model components from a pickle file.

    Returns:
        dict: A dictionary containing the loaded model components (vectorizer, similarity, data).
    """

    with open('final_trained_model.pkl', 'rb') as f:
        model_components = pickle.load(f)
    return model_components

model_components = load_model_components()  # Uncomment to load on startup

@app.route('/api/unique_pain', methods=['GET'])
def get_unique_pain():
    try:
        unique_pain = data['Pain'].unique().tolist()
        print("The list is :", unique_pain)
        return jsonify(unique_pain)
    except KeyError as e:
        print(f"Error: {e}. 'Pain' column not found in the data.")
        return jsonify({"error": "Pain column not found"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/api/recommend', methods=['POST'])
@app.route('/api/recommend', methods=['POST'])
def recommend():
    global vectorizer, similarity, data  # Declare and modify global variables

    vectorizer = model_components['vectorizer']
    similarity = model_components['similarity']
    data = model_components['data']  # Access components from dictionary

    pain_name = request.json['pain']  # Access JSON data from the request body
    
    list_of_all_pain = data['Pain'].tolist()
    find_close_match = difflib.get_close_matches(pain_name, list_of_all_pain)
    
    if find_close_match:
        close_match = find_close_match[0]
        index_of_close_match = data[data['Pain'] == close_match].index[0]
        similarity_scores = list(enumerate(similarity[index_of_close_match]))
        sorted_similar_poses = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        
        # Get recommended poses and their image URLs
        recommended_data = []
        for index, _ in sorted_similar_poses[:6]:
            pose_name = data.loc[index, 'AName']
            image_url = data.loc[index, 'Photo']  # Assuming 'Photo' is the column containing image URLs
            recommended_data.append({'pose': pose_name, 'image': image_url})

        return jsonify(recommended_data)
    else:
        return jsonify(message="No recommendations available for the selected pain."), 404
    
    
@app.route('/')
def index():
    return render_template('index.html')






@app.route("/api/login",methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error":"Unauthorized Access"}),401
    
    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"error":"Unauthorized"}),401

    session["user_id"] = user.id
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "id" : user.id,
        "email" : user.email,
        "access_token":access_token
    })


@app.route('/api/userData',methods=['GET'])
@jwt_required()
def get_user_data():
    user_id=get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({'error':'User not found'}),404

    user_data = {
        'id':user.id,
        'email':user.email,
        'name':user.name
    }

    return jsonify(user_data)


@app.route('/api/register', methods=['POST'])
def register():
    email = request.json["email"]
    name = request.json["name"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    hashed_password = bcrypt.generate_password_hash(password)
   
    
    if user_exists:
        return jsonify({"error" : "Email already exists"}),400
    
    new_user = User(email=email,name=name,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id" : new_user.id,
        "email" : new_user.email
    })

@app.route('/api/getblogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()

    if not blogs:
        return jsonify({'message': 'No blogs found'}), 404

    blog_list = []
    for blog in blogs:
        blog_data = {
            'id': blog.id,
            'title': blog.title,
            'content': blog.content,
            'author_id': blog.author_id,
            'created_at': blog.created_at,
            'updated_at': blog.updated_at
        }
        blog_list.append(blog_data)

    return jsonify(blog_list), 200 


@app.route('/api/blogs', methods=['POST'])
@jwt_required()
def add_blogs():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    title = request.json['title']
    content = request.json['content']

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    new_blog = Blog(title=title, content=content, author_id=user.id)

    db.session.add(new_blog)
    db.session.commit()

    return jsonify({
        'id': new_blog.id,
        'title': new_blog.title,
        'content': new_blog.content,
        'author_id': new_blog.author_id,
        'created_at': new_blog.created_at,
        'updated_at': new_blog.updated_at
    }), 201

# Route for seeing a data
@app.route('/api/data',methods=['GET'])
def get_data():
    data = {
        "message":"Hello this is api end point"
    }

    return jsonify(data)


 
    
 
     
# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)