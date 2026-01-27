**Architecture & Project Overview**

**General Concept**

This project is a Full-Stack Inventory Management system. The main goal was to create a reliable tool for managing a product catalog and tracking real-time inventory levels. I built the system with a clear separation between the Frontend (React) and the Backend (Node.js) to ensure scalability and clean code.


**The Tech Stack**

**Frontend:** Developed with React, utilizing Hooks for state management and Axios for seamless communication with the server.

**Backend:** A Node.js & Express server that handles the business logic, data validation, and API routing.

**Database:** PostgreSQL for persistent storage.

**Testing:** Integrated Jest & Supertest to perform Unit Testing on the core API logic.


**Design Decisions & Personal Growth**
While the project requirements allowed for simpler data persistence, I decided to take it a step further:

Integrating a Real Database (PostgreSQL): I chose to implement a full relational database. As a developer, I’m constantly looking to sharpen my skills in data modeling and SQL. Using a database like Postgres allowed me to practice robust data integrity and ensure that the inventory remains consistent even after a server restart.


**System Data Flow**
Interaction: The user updates a quantity or adds a product in the React UI.

Processing: The UI sends a request to the Express API, which validates the inputs (e.g., checking for negative quantities or missing fields).

Persistence: Once validated, the server updates the PostgreSQL tables.

Verification: Automated tests (Jest) run against these endpoints to make sure the logic holds up under different scenarios.


**Component Breakdown**
To maintain a clean and organized UI, the frontend is divided into reusable components. This modular approach ensures that each part of the interface has a single responsibility:

Inventory Table: A dynamic component that renders the product list, handles real-time quantity updates, and manages the validation logic for user inputs.

Product Management: Specialized views for adding new items to the system, ensuring that the catalog and the inventory stay synchronized.



**Tools Used:**
Tools & Methodology: This project was developed using modern development workflows, including the use of AI assistance for architectural guidance and debugging. This allowed me to implement advanced features like automated unit testing and maintaining high coding standards.


**Scalability & Future Improvements**
While the current version provides a solid foundation, the architecture was designed with growth in mind:

User Authentication & Authorization: In the future, I plan to add a secure login system to allow different access levels (e.g., View-only for employees vs. Full Access for managers).

Advanced Analytics Dashboard: Leveraging the PostgreSQL database to generate reports on stock movement and low-inventory alerts.


**How to Access & Run**

Local Development:

Backend & Tests: Navigate to /backend and run npm install followed by npm start (or npm test to run logic validations).

Frontend: Navigate to /frontend and run npm install followed by npm run dev.
Note: Please ensure you have a local PostgreSQL instance running and update the .env file in the /backend folder with your credentials before starting the server
