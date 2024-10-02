
# Llama Creator

A simple web application designed to transform scientific papers into social media-friendly explainer cards. Users can upload PDF files or provide links to PDF documents, and the app will generate cards containing essential parts of the research, including an overview, background, research question, researchers and institution, methods, findings, results, and impact.

## Features

- Upload PDF files or enter links to scientific papers for processing.
- Generate social media-ready explainer cards from research papers.
- Extracts and organizes critical information into easy-to-read formats.
- User-friendly interface for seamless interaction.

## Technologies Used

- **React**: For building the user interface.
- **JavaScript**: For application logic.
- **PDF.js**: For parsing PDF documents and extracting content.
- **CSS**: For styling the application.
- **Vercel**: For deployment.

## Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**

```bash
   git clone https://github.com/alharkan7/llama-creator.git
```

**2.  Navigate to the project directory:**
    
```bash   
cd llama-creator
```  

**3.  Install the dependencies:**
    
```bash    
npm install
```

**4.  Start the development server:**
    
```bash    
npm start
```

**5.  Open your browser** 

Visit visit `http://localhost:3000` to see the app in action.

## Backend API
 
The application uses **FastAPI** to receive PDF files or links, which are then processed to transform them into explainer flashcards using **Meta Llama**. You can find the backend API repository here [https://github.com/alharkan7/llama-creator-api](https://github.com/alharkan7/llama-creator-api).


## Deployment

This app is deployed on Vercel. You can access it here [https://llama-creator.vercel.app](https://llama-creator.vercel.app/).

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

-   [React](https://reactjs.org/) for the powerful framework.
-   PDF.js for PDF parsing capabilities.
-   [Vercel](https://vercel.com/) for easy deployment.

----------

## Happy Creating!
