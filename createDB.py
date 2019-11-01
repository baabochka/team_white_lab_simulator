import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient.chemLab


collection = mydb.Person

studentList = [
  { "name": "Hannah", "email": "example2@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Michael", "email": "example3@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Sandy", "email": "example4@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Betty", "email": "example5@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Richard", "email": "example6@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Susan", "email": "example7@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Vicky", "email": "example8@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "Ben", "email": "example9@gmail.com", "password": "password", "role": "student", "courses": []},
  { "name": "BenMen", "email": "example9@gmail.com", "password": "password", "role": "student", "courses": []}
]
profList = [
  { "name": "McKenna", "email": "example21@gmail.com", "password": "password", "role": "professor", "courses": []},
  { "name": "Fodor", "email": "example22@gmail.com", "password": "password", "role": "professor", "courses": []},
  { "name": "Ferdman", "email": "example23@gmail.com", "password": "password", "role": "professor", "courses": []},
]
x = collection.insert_many(studentList)
x = collection.insert_many(profList)

collection = mydb.Material
materialList = [
  { "name": "H2O", "description": "Simple water", "state": "liquid", "color": "blue"},
  { "name": "H2SO4", "description": "acid", "state": "liquid", "color": "green"},
]
x = collection.insert_many(materialList)
m_id1 = mydb.Material.find_one({"name":"H2O"})
m_id2 = mydb.Material.find_one({"name":"H2SO4"})
#
collection = mydb.Equipment
equipmentList = [
  { "name": "Micropipette", "description": "Tool to pick and drop small amount of liquid", "state": "state", "materials": [m_id1, m_id2]},
  { "name": "Beaker", "description": "Glass container graduated with lines indicating the volume contained", "state": "state", "materials": [m_id1, m_id2]},
]
x = collection.insert_many(equipmentList)
#
id1 = mydb.Person.find_one({"name":"McKenna"})
id2 = mydb.Person.find_one({"name":"Fodor"})
id3 = mydb.Person.find_one({"name":"Ferdman"})
e_id1 = mydb.Equipment.find_one({"name":"Micropipette"})
e_id2 = mydb.Equipment.find_one({"name":"Beaker"})

collection = mydb.Lab
labList = [
  { "name": "Lab 1", "description": "Mix water and H2SO4", "professors": [id1], "steps": [], "equipments": [e_id1,e_id2]},
]

x = collection.insert_many(labList)

l_id1 = mydb.Lab.find_one({"name":"Lab 1"})

collection = mydb.Course
courseList = [
  { "name": "CSE308", "description": "Software Engineering", "professors": [id1], "labs": [l_id1]},
  { "name": "CSE303", "description": "Introduction to the Theory of Computation", "professors": [id2],"labs": [l_id1]},
  { "name": "CSE356", "description": "Cloud Computing", "professors": [id3], "labs": [l_id1]},
]

x = collection.insert_many(courseList)


print(mydb.list_collection_names())

#print list of the _id values of the inserted documents:
# print(x.inserted_ids)

#
# collection = mydb.Person
# collection.drop()
# collection = mydb.Lab
# collection.drop()
# collection = mydb.Material
# collection.drop()
# collection = mydb.Equipment
# collection.drop()
# collection = mydb.Course
# collection.drop()
