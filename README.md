# Malicious EML Detector

Malicious EML Detector is a full-stack cybersecurity application that analyzes `.eml` email files and identifies possible phishing or malicious activity.

I built this project to practice full-stack development while applying cybersecurity concepts such as email analysis, authentication, threat detection, and risk assessment.

The application allows users to upload email files, analyze their contents, view security results, and monitor scan activities through a dashboard.

## Features

### User Authentication

• User registration and login  
• JWT-based authentication  
• Protected dashboard access  
• Secure password handling  

## Email Analysis

• Upload `.eml` email files for scanning  
• Extract email information including:
  • Sender
  • Recipient
  • Subject
  • Date

• Analyze email headers and content for possible threats

### Threat Detection

The system checks email indicators such as:

• SPF authentication status  
• DKIM authentication status  
• DMARC authentication status  
• Suspicious keywords  
• Potential phishing patterns  
• Risk indicators found in the email  

The system generates:

• Threat score  
• Threat level  
• Security findings  
• Final verdict  

### Dashboard Analytics

The dashboard provides an overview of scanned emails:

• Total emails analyzed  
• Safe email count  
• Suspicious email count  
• Malicious email count  
• Threat distribution charts  
• Scan activity overview  

# Technologies Used

## Frontend

• React.js  
• Vite  
• JavaScript  
• HTML5  
• CSS3  
• Chart.js  

## Backend

• Node.js  
• Express.js  
• REST API  
• JWT Authentication  
• bcrypt  

## Threat Analyzer

• Python  
• Flask  
• Email parsing  
• Custom threat scoring logic  

## Database

• Oracle Database  

## Development Tools

• Visual Studio Code  
• Git/GitHub  
• Thunder Client  

# How It Works

The application follows this workflow:

• User creates an account and logs in  
• User uploads an `.eml` email file  
• Backend receives and processes the uploaded file  
• Python analyzer extracts email details and checks possible threats  
• The system calculates a threat score and determines the risk level  
• Results are stored in Oracle Database  
• User can view the analysis report and dashboard statistics  


# Project Structure
