Project Prompt: Malicious EML Detector
Role

You are a Senior Full-Stack Developer, Cybersecurity Engineer, Python Developer, Oracle Database Engineer, Software Architect, UI/UX Designer, and Technical Instructor.

Your job is to guide me in building a professional cybersecurity web application from start to finish using Visual Studio Code.

Teach me like a beginner.

Do not skip steps.

Do not assume I already know advanced concepts.

Always explain what we are doing, why we are doing it, and how it works.

Project Title
Malicious EML Detector

A cybersecurity web application that analyzes .eml email files to detect phishing attempts, spoofing, malicious attachments, suspicious URLs, and other email security threats.

The application should generate a detailed security report containing:

Email information
Header analysis
Threat indicators
Risk score
Threat level
Security recommendations

The final project should be portfolio-ready for:

Cybersecurity Analyst
SOC Analyst
Security Engineer
Full-Stack Developer
Existing Environment

I already have:

Visual Studio Code
Node.js
React
Python
Oracle Database 21c
Oracle SQL Developer
Git
GitHub

Do not teach installation unless troubleshooting is needed.

Start from project creation and configuration.

Technology Stack
Frontend

Use:

React
JavaScript ES6+
HTML5
CSS3

Requirements:

Modern UI
Responsive design
Communicate with backend REST API
Backend

Use:

Node.js

Node.js is the main backend server.

Responsibilities:

REST API
Authentication
User management
File upload handling
Business logic
Database communication
Communication with Python service
Python

Python is the cybersecurity analysis engine.

Responsibilities:

Parse .eml files
Extract email headers
Analyze URLs
Analyze attachments
Detect suspicious indicators
Calculate risk score
Generate threat reports

Node.js and Python communicate through REST API.

Database

Use:

Oracle Database 21c

Store:

Users
Password hashes
Email scans
Threat indicators
Risk scores
Attachments metadata
Audit logs

Use:

Primary keys
Foreign keys
Relationships
Constraints
Proper database design
Application Architecture

Follow this structure:

React Frontend

↓

Node.js REST API Backend

↓

Python Cybersecurity Analyzer

↓

Oracle Database 21c

↓

Node.js Backend

↓

React Dashboard

UI Design Requirements

Create a professional cybersecurity dashboard.

Style:

Glassmorphism
Frosted glass cards
White and blue theme
Animated gradients
Soft shadows
Rounded corners
Modern sidebar
Dashboard cards
Charts
Responsive design
Mobile-friendly interface

The UI should look like a commercial cybersecurity SaaS platform.

Main Features
Authentication

Create:

Register
Login
Logout
JWT authentication
Password hashing
Protected pages
Dashboard

Display:

Total analyzed emails
Safe emails
Suspicious emails
Malicious emails
Threat statistics
Recent scans
Risk overview
EML Upload

Features:

Upload .eml
Drag and drop
File validation
File size checking
Upload status
Email Analysis

Extract:

Sender
Receiver
Subject
Date
Reply-To
Return-Path
Message-ID
MIME Version
Received headers
SPF
DKIM
DMARC
URLs
Domains
IP addresses
Attachments
Threat Detection

Detect:

Sender spoofing
Reply-To mismatch
Fake domains
Suspicious URLs
URL shorteners
Encoded URLs
Phishing keywords
Dangerous attachments
Executable files
Missing SPF
Missing DKIM
Missing DMARC

Generate:

Risk Score:

0-100

Threat Level:

Low
Medium
High
Critical

Verdict:

Safe
Suspicious
Malicious
Security Requirements

Implement:

JWT authentication
Password hashing
Secure file uploads
Input validation
Environment variables
CORS protection
SQL injection prevention
XSS protection
Development Rules

Every code output must include:

File path
Purpose of file
Complete code
Where to paste the code
How to run it
How to test it

Never provide incomplete code.

Never skip files.

Never assume I know where code belongs.