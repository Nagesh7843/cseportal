import urllib.request
import urllib.parse
import json
import sys

def run():
    # Login
    login_url = "http://localhost:8080/api/v1/auth/login"
    login_data = json.dumps({
        "email": "nagesh@sitcoe.org.in",
        "password": "N@gesh7843",
        "role": "admin"
    }).encode('utf-8')
    
    req = urllib.request.Request(login_url, data=login_data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            token = res_data.get('token')
            if not token:
                print("No token received.")
                return
    except Exception as e:
        print(f"Login failed: {e}")
        return

    # Data to insert
    students = [

    {
        "rollNo": "1",
        "prn": "2410104007",
        "name": "Gouri Rajendra Agalave",
        "email": "gouriagalave028@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "2",
        "prn": "2410104011",
        "name": "Payal Bhanudas Awalekar",
        "email": "awalekarpayal48@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "3",
        "prn": "2410104016",
        "name": "Rutu RajeshBharati",
        "email": "bharatirutu64@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "4",
        "prn": "2410104017",
        "name": "kiran satappa bhogulkar",
        "email": "kiranbhogulkar7@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "5",
        "prn": "2430104180",
        "name": "Aishwarya Appayya Borgalli",
        "email": "borgalliaishwarya@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "6",
        "prn": "2410104022",
        "name": "Trupti Tanaji Chand",
        "email": "truptichand19@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "7",
        "prn": "2410104027",
        "name": "Pranali Ravindra Chougule",
        "email": "chougulepranali66@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "8",
        "prn": "2410104029",
        "name": "Arpita Sunil Davadate",
        "email": "arpitadavadate3012@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "9",
        "prn": "2410104031",
        "name": "Nidhi Rahul Dayma",
        "email": "ndayma2006@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "10",
        "prn": "2440104197",
        "name": "Priyadarshani Balu Desai",
        "email": "priyadarshanidesai315@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "11",
        "prn": "2410104035",
        "name": "Utkarsha Ramchandra Dhobale",
        "email": "utkarshadhobale4@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "12",
        "prn": "2410104036",
        "name": "Manasi Bajirao Dhotre",
        "email": "dhotremanasi0105@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "13",
        "prn": "2410104038",
        "name": "Shreya Sambhaji Dounde",
        "email": "doundeshreya34@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "14",
        "prn": "2410104039",
        "name": "Amruta Sukhdev Dudhale",
        "email": "amrutadudhale03@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "15",
        "prn": "2410104040",
        "name": "Sakshi Subhash Dudhale",
        "email": "sakshidudhale05@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "16",
        "prn": "2430104181",
        "name": "vaishnavi Rajendra Eksambe",
        "email": "vaishnavieksambe5321@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "17",
        "prn": "2410104044",
        "name": "Arnavi Jitendra Garade",
        "email": "arnavigarade@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "18",
        "prn": "2410104046",
        "name": "Samiksha Shrikant Gawade",
        "email": "samikshagawade1677@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "19",
        "prn": "2410104047",
        "name": "Sayali Dipak Ghat",
        "email": "ghatsayali@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "20",
        "prn": "2410104049",
        "name": "Payal Krushnath Gujar",
        "email": "payalgujar2005@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "21",
        "prn": "2410104052",
        "name": "Sanika Pintu Halsavade",
        "email": "halsavadesanika@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "22",
        "prn": "2410104053",
        "name": "Amruta Rajaram Harmalkar",
        "email": "haramalkaramruta@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "23",
        "prn": "2410104055",
        "name": "Sakshi Arjun Jadhav",
        "email": "sakj5706@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "24",
        "prn": "2410104056",
        "name": "Ashwini Sanjay Kabbure",
        "email": "ashwinikabbure31@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "25",
        "prn": "2410104058",
        "name": "Trupti Mahadev Kale",
        "email": "kaletrupti2006@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "26",
        "prn": "2420104161",
        "name": "Utkarsha Uday Kerimane",
        "email": "utkarshakerimane@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "27",
        "prn": "2420104175",
        "name": "Neha Arun Rajmane",
        "email": "NehaRajmane07@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "28",
        "prn": "2420104177",
        "name": "Varda Vijay Shirgavkar",
        "email": "varadashirgaonkar@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "29",
        "prn": "2310104032",
        "name": "Anuja Madhukar Ghatage",
        "email": "anujaghatage1@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A1",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "30",
        "prn": "2410104006",
        "name": "Govind Balaji Adaki",
        "email": "govind482006@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "32",
        "prn": "2410104009",
        "name": "Pranav Chandrakant Atigidad",
        "email": "atigidadpranav@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "34",
        "prn": "2410104013",
        "name": "Raju Jotiba Bandekar",
        "email": "rajubandekar86@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "36",
        "prn": "2410104015",
        "name": "Bajrang Dinkar Barangule",
        "email": "bajrangbarangule@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "38",
        "prn": "2410104019",
        "name": "Adish Sanjay Bondre",
        "email": "adishbondre6@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "39",
        "prn": "2410104020",
        "name": "Rohit Sambhaji Budake",
        "email": "rohitbudake6@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "40",
        "prn": "2410104021",
        "name": "Pravin Shrinivas Budharam",
        "email": "pravinbudharam16@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "44",
        "prn": "2410104026",
        "name": "Mandar Anil Chougule",
        "email": "mandarchougule2006@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "45",
        "prn": "2410104028",
        "name": "SHREYAS RAKESH DADAPE",
        "email": "shreyasdadape8055@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "46",
        "prn": "2410104030",
        "name": "Vighnesh Jayram Davang",
        "email": "vighneshdavang4@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A2",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "47",
        "prn": "2410104032",
        "name": "Omkar Narayan Desai",
        "email": "omkardesai1015@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "48",
        "prn": "2410104033",
        "name": "Rushikesh Laxman Deshmukh",
        "email": "rushikeshdeshmukh907@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "49",
        "prn": "2410104034",
        "name": "Rushikesh Rahul Dharane",
        "email": "rushikeshdharane8@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "50",
        "prn": "2410104037",
        "name": "Pranav Dayanand  Dongare",
        "email": "dongarepranav641@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "51",
        "prn": "2410104041",
        "name": "Vishal Machindra Dupade",
        "email": "vishaldupade18@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "52",
        "prn": "2410104042",
        "name": "Nagesh shankar Gaikwad",
        "email": "gnagesh550@sitcoe.org.in",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "53",
        "prn": "2410104043",
        "name": "Omkar Vishnu Gaikwad",
        "email": "omkargaikwad9606@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "54",
        "prn": "2410104045",
        "name": "Prasad Sanjay Gavandi",
        "email": "prasadsg21@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "55",
        "prn": "2440104198",
        "name": "Shridhar Bajrang Gurav",
        "email": "shridhargurav754@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "56",
        "prn": "2440104199",
        "name": "Harshvardhan Bajirao Ingale",
        "email": "harshingale45@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "57",
        "prn": "2530204034",
        "name": "Abulfaiz Mainuddin Inamdar",
        "email": "abulfaiz982@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "58",
        "prn": "24101014057",
        "name": "Dnyaneshwar Abhay Kadam",
        "email": "dak49352005@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "60",
        "prn": "2410104067",
        "name": "Anjuman Rustum a bagdad khalipha",
        "email": "anjumankh0@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "61",
        "prn": "2510204020",
        "name": "Pranav Sanjay Potadar",
        "email": "pranavpotadar02@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "62",
        "prn": "2410104069",
        "name": "Yash Netaji Kolekar",
        "email": "yashkolekar2006@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "63",
        "prn": "2420104165",
        "name": "Omkar Raju Gurav",
        "email": "omkargurav3654@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "64",
        "prn": "2420104166",
        "name": "Parshvanath Piragounda Patil",
        "email": "patilparshwa675@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "65",
        "prn": "2420104167",
        "name": "Parshwa Suresh Ammanawar",
        "email": "ammanawarp@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "66",
        "prn": "2420104171",
        "name": "Pranav Sandip patil",
        "email": "pspatil384@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "67",
        "prn": "2420104173",
        "name": "Tejas Jitendra Patil",
        "email": "tejaspatil111205@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "68",
        "prn": "2420104174",
        "name": "Shrirang Mangesh Pujari",
        "email": "shrirangpujari31@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    },

    {
        "rollNo": "69",
        "prn": "2420104172",
        "name": "Sushant Raghunath Patil",
        "email": "patilsushant5510@gmail.com",
        "academicYear": "TY",
        "division": "Div A",
        "batchGroup": "A3",
        "cohortBatch": "2023-2027",
        "gpa": 3.5,
        "status": "Active"
    }

]

    # Get all existing students and delete them
    get_url = "http://localhost:8080/api/v1/students"
    req_get = urllib.request.Request(get_url, headers={'Authorization': f'Bearer {token}'})
    try:
        with urllib.request.urlopen(req_get) as response:
            existing_students = json.loads(response.read().decode('utf-8'))
            for student in existing_students:
                student_id = student.get('id')
                if student_id:
                    delete_url = f"http://localhost:8080/api/v1/students/{student_id}"
                    req_delete = urllib.request.Request(delete_url, headers={'Authorization': f'Bearer {token}'}, method='DELETE')
                    try:
                        urllib.request.urlopen(req_delete)
                    except Exception as e:
                        print(f"Failed to delete student {student_id}: {e}")
            print(f"Cleared {len(existing_students)} existing students.")
    except Exception as e:
        print(f"Failed to fetch students for deletion: {e}")

    bulk_url = "http://localhost:8080/api/v1/students/bulk"
    bulk_data = json.dumps(students).encode('utf-8')
    req = urllib.request.Request(bulk_url, data=bulk_data, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    })

    try:
        with urllib.request.urlopen(req) as response:
            print(f"Successfully inserted students. Status code: {response.getcode()}")
    except Exception as e:
        body = e.read().decode('utf-8') if hasattr(e, 'read') else str(e)
        print(f"Failed to insert students: {e}")
        print(f"Response body: {body}")

if __name__ == '__main__':
    run()
