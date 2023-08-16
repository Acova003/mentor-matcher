# Mentor Matcher

## Table of Contents

- [System Overview](#system-overview)
- [System Components](#system-components)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [External API Usage](#external-api-usage)
- [System Architecture](#system-architecture)
- [System Features](#system-features)
- [Installation and Setup](#installation-and-setup)
- [Getting Started](#getting-started)
- [Internal API Documentation](#internal-api-documentation)
- [Application Walkthrough](#application-walkthrough)

## System Overview

Mentor Matcher harnesses ChatGPT's AI capabilities to streamline CodeOp School's mentorship program. By using AI to pair mentees with mentors, we reduce administrative costs and promote meaningful connections.

## System Components

### Frontend

Built with ReactJS, the frontend provides a responsive and intuitive interface, facilitating user interactions, data collection, and displaying mentor-mentee matches.

### Backend

The backend, powered by Node JS, oversees server-side operations, processes requests, and integrates ChatGPT data for optimal mentor-mentee matching.

### Database

MySQL is utilized as the database, storing both mentor and mentee questionnaire responses and the resultant ChatGPT matching data.

### External API Usage

#### Open AI API

We integrate ChatGPT from OpenAI to refine the mentor-mentee matching process. The AI analyzes responses from both participants to suggest the best matches. Learn more from the [OpenAI official documentation](https://platform.openai.com/docs/guides/gpt).

## System Architecture

Mentor Matcher adopts a client-server architecture. The frontend communicates with the backend to handle data in the database, with ChatGPT central to the matching procedure.

- **Presentation Layer**: Developed using ReactJS, it guarantees a top-tier user experience. Additionally, there's an administrative authentication mechanism ensuring secure access.
  
- **Application Layer**: Backend services in Node.js process user requests and handle database communication, while strict validation methods ensure data consistency.
  
- **Data Layer**: MySQL efficiently handles data storage, with a well-structured database schema representing all relevant entities.

## System Features

### AI Powered Matching

- ChatGPT analyzes mentor and mentee questionnaire responses to recommend suitable matches.

### Responsive User Interface

- Designed with ReactJS, offering consistent performance across different devices.

### Form-driven Data Collection

- Detailed forms capture preferences and qualifications of mentors and mentees.

### Backend Operations

- Utilizes Node.js for proficient server-side tasks and data handling.

### Integrated Database System

- MySQL is employed for data storage, retrieval, and management of user profiles and AI-inferred match information.
  
## Installation and Setup

### Setting Up the Project

1. **Clone the Repository**: 

    Use the following command to clone the repository:

    ```
    git clone https://github.com/Acova003/mentor-matcher.git
    cd mentor-matcher
    ```

2. **Running the Backend**:

    First, you'll need to install the backend dependencies:

    ```
    npm install
    ```

    After the installation is complete, you can run the backend:

    ```
    npm run start
    ```

3. **Running the Frontend**:

    Open a new terminal and navigate to the frontend directory:

    ```
    cd client/
    ```

    Install the frontend dependencies:

    ```
    npm install
    ```

    Once the installation is complete, start the frontend application:

    ```
    npm run dev
    ```
4. **Get ChatGPT Auth key**
   In the Open AI developer portal, attain a auth key for ChatGPT-4. *Note*: You might have to go on a payment plan. Be sure that you have enough credits for API usage.
   
6. **Configurations**:
    In the root directory, create a file called ".env" to store your secrets. Adjust to your own settings.

Add the following fields:
  DB_HOST=127.0.0.1
  DB_USER=root
  DB_NAME=mentor_matcher
  DB_PASS=your_password_here
OPEN_AI_API_KEY=your_openai_api_key_here

5. **Database migration**
   ```
   npm run migrate
   ```

## Getting Started

After completing the setup, Mentor Matcher should now be accessible at [http://localhost:5173/](http://localhost:5173/).

## Internal API Documentation

Below is a brief overview of the available API endpoints:

| Method   | URL                        | Description               |
| -------- | -------------------------- | ------------------------- |
| `GET`    | `/api/mentees`             | Get all mentees           |
| `POST`   | `/api/mentees`             | Add mentee                |
| `GET`    | `/api/mentees/{mentee id}` | Get mentee by id          |
| `PUT`    | `/api/mentees/(mentee id}` | Update mentee by id       |
| `DELETE` | `/api/mentees/{mentee id}` | Delete mentee by id       |
| `GET`    | `/api/mentors`             | Get all mentors           |
| `POST`   | `/api/mentors`             | Add mentor                |
| `GET`    | `/api/mentors/{mentor id}` | Get mentor by id          |
| `PUT`    | `/api/mentors/{mentor id}` | Update mentor by id       |
| `DELETE` | `/api/mentors/{mentor id}` | Delete mentor by id       |
| `POST`   | `/api/matches`             | Generate ChatGPT response |
| `GET`    | `/api/matches`             | Get all matches           |

