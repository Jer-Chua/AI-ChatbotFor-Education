import React, { useEffect, useRef, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import '../css/AIChatbot.css';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import axios from 'axios';
import FormData from 'form-data';
import { Document, Page } from 'react-pdf';

const AIChatbot = (props) => {
  const configuration = new Configuration({
    apiKey: "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",
    // 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
  });
  const openai = new OpenAIApi(configuration);

  const [sourceId, setSourceID] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [temperatureValue, setTemperatureValue] = useState(1);
  const [topPValue, setTopPValue] = useState(1);
  const [topic, setTopic] = useState("optimize");
  const [AIModel, setAIModel] = useState("gpt-3.5-turbo");
  const [systemPrompt, setSystemPrompt] = useState("You are a AI assistant that try to understand the question like a human. If you have any doubt, ask the user for clarification");
  const [chatConverstationHistory, setChatConverstationHistory] = useState([]);
  const [systemChatConverstaionHistory, setSystemChatConversationHistory] = useState([]);
  const currentIndex = useRef(0);
  const [showChatConverstationHistory, setShowChatConverstationHistory] = useState(true);
  const [doubleChecking, setDoubleChecking] = useState(false);
  const [codeTestCases, setCodeTestCases] = useState([""]);
  const [chatPDFHistory, setChatPDFHistory] = useState({});
  // const [chatHistory, setChatHistory] = useState([
  //   {
  //     "role": "system",
  //     "content": "You are a AI assistant that try to understand the question like a human. If you have any doubt, ask the user for clarification"
  //   },
  //   {
  //     "role": "user",
  //     "content": "Develop an application in ReactJS that acts as a spaceship game that uses arrow keys to move the spaceship"
  //   },
  //   {
  //     "role": "assistant",
  //     "content": "Auto Generated Prompt:Based on the examples of the test cases, I have generated the following prompts ranked from best to worst based on how well they fit the user prompt:\n\n1. \"Develop a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys.\"\n\n2. \"Create a ReactJS game where a spaceship can be controlled using arrow keys to navigate through obstacles.\"\n\n3. \"Build a ReactJS application that functions as a spaceship game, enabling players to maneuver a spaceship using arrow keys to avoid obstacles and accomplish objectives.\"\n\n4. \"Develop a ReactJS application that resembles a spaceship game, providing users with the ability to pilot a spaceship using arrow keys for movement and engage in various tasks and challenges.\"\n\n5. \"Design a ReactJS application that incorporates a spaceship simulation, allowing users to pilot the spaceship using arrow keys and participate in interactive missions and adventures.\"\n\nPlease note that these prompts are generated based on the provided information and may not fully capture the specific requirements or details of the user prompt."
  //   },
  //   {
  //     "role": "user",
  //     "content": "Develop a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys."
  //   },
  //   {
  //     "role": "assistant",
  //     "content": "Alright, I understand that you need a ReactJS application that simulates a spaceship game, where users can control the spaceship's movement using arrow keys. Below are the steps we can follow to develop the application:\n\n1. Set up the development environment: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can check this by running `node -v` and `npm -v` commands in your terminal. If not installed, download and install them from the official Node.js website.\n\n2. Create a new React application: Open your terminal and run the following command to generate a new React application using create-react-app. This command will create a new directory with the name of your application:\n   ```\n   npx create-react-app spaceship-game\n   ```\n\n3. Navigate to the project directory: Change your current working directory to the newly created project directory:\n   ```\n   cd spaceship-game\n   ```\n\n4. Remove unnecessary files: Delete the `src/App.css`, `src/App.test.js`, `src/logo.svg`, and `src/serviceWorker.js` files from the project directory since we won't be using them.\n\n5. Create necessary components: Inside the `src` directory, create a new directory named `components` to store our React components. Inside the `components` directory, create a new file named `Spaceship.js`.\n\n6. Implement the Spaceship component: Open the `Spaceship.js` file and implement the Spaceship component. This component will render the spaceship and handle the keyboard events for controlling the spaceship movement. Here's a sample implementation:\n\n```jsx\nimport React, { useEffect } from 'react';\n\nconst Spaceship = () => {\n  useEffect(() => {\n    const handleKeyDown = (e) => {\n      if (e.keyCode === 37) { // Left arrow key\n        // Handle left movement\n      } else if (e.keyCode === 39) { // Right arrow key\n        // Handle right movement\n      } else if (e.keyCode === 38) { // Up arrow key\n        // Handle up movement\n      } else if (e.keyCode === 40) { // Down arrow key\n        // Handle down movement\n      }\n    };\n\n    document.addEventListener('keydown', handleKeyDown);\n\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, []);\n\n  return (\n    <div>\n      {/* Render the spaceship */}\n    </div>\n  );\n};\n\nexport default Spaceship;\n```\n\nIn the above code, we have used the `useEffect` hook to add an event listener for keyboard events. When the component is mounted, it adds the event listener, and when the component is unmounted, it removes the event listener. Inside the `handleKeyDown` function, you can handle the spaceship movement based on the keycode of the arrow keys.\n\n7. Update the App component: Open the `src/App.js` file and update the App component to render the Spaceship component. Here's an example:\n\n```jsx\nimport React from 'react';\nimport Spaceship from './components/Spaceship';\n\nconst App = () => {\n  return (\n    <div>\n      <h1>Spaceship Game</h1>\n      <Spaceship />\n    </div>\n  );\n};\n\nexport default App;\n```\n\n8. Run the application: Save all the changes and start the development server by running the following command in your terminal:\n   ```\n   npm start\n   ```\n\n   This command will start the application and open it in your default web browser.\n\n9. Test the spaceship movement: With the application running, try using the arrow keys on your keyboard to control the spaceship movement. You can add styles to the Spaceship component and implement the spaceship's movement logic as per your requirements.\n\nThat's it! You have now developed a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys. Feel free to customize and add more features to enhance the game."
  //   }
  // ]

  // );
  const [chatHistory, setChatHistory] = useState([
    // {
    //   "role": "system",
    //   "content": "You are a AI assistant that try to understand the question like a human. If you have any doubt, ask the user for clarification"
    // },
    // {
    //   "role": "user",
    //   "content": "Develop an application in ReactJS that acts as a spaceship game that uses arrow keys to move the spaceship"
    // },
    // {
    //   "role": "assistant",
    //   "content": "Auto Generated Prompt:Based on the examples of the test cases, I have generated the following prompts ranked from best to worst based on how well they fit the user prompt:\n\n1. \"Develop a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys.\"\n\n2. \"Create a ReactJS game where a spaceship can be controlled using arrow keys to navigate through obstacles.\"\n\n3. \"Build a ReactJS application that functions as a spaceship game, enabling players to maneuver a spaceship using arrow keys to avoid obstacles and accomplish objectives.\"\n\n4. \"Develop a ReactJS application that resembles a spaceship game, providing users with the ability to pilot a spaceship using arrow keys for movement and engage in various tasks and challenges.\"\n\n5. \"Design a ReactJS application that incorporates a spaceship simulation, allowing users to pilot the spaceship using arrow keys and participate in interactive missions and adventures.\"\n\nPlease note that these prompts are generated based on the provided information and may not fully capture the specific requirements or details of the user prompt."
    // },
    // {
    //   "role": "user",
    //   "content": "Develop a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys."
    // },
    // {
    //   "role": "assistant",
    //   "content": "Alright, I understand that you need a ReactJS application that simulates a spaceship game, where users can control the spaceship's movement using arrow keys. Below are the steps we can follow to develop the application:\n\n1. Set up the development environment: Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can check this by running `node -v` and `npm -v` commands in your terminal. If not installed, download and install them from the official Node.js website.\n\n2. Create a new React application: Open your terminal and run the following command to generate a new React application using create-react-app. This command will create a new directory with the name of your application:\n   ```\n   npx create-react-app spaceship-game\n   ```\n\n3. Navigate to the project directory: Change your current working directory to the newly created project directory:\n   ```\n   cd spaceship-game\n   ```\n\n4. Remove unnecessary files: Delete the `src/App.css`, `src/App.test.js`, `src/logo.svg`, and `src/serviceWorker.js` files from the project directory since we won't be using them.\n\n5. Create necessary components: Inside the `src` directory, create a new directory named `components` to store our React components. Inside the `components` directory, create a new file named `Spaceship.js`.\n\n6. Implement the Spaceship component: Open the `Spaceship.js` file and implement the Spaceship component. This component will render the spaceship and handle the keyboard events for controlling the spaceship movement. Here's a sample implementation:\n\n```jsx\nimport React, { useEffect } from 'react';\n\nconst Spaceship = () => {\n  useEffect(() => {\n    const handleKeyDown = (e) => {\n      if (e.keyCode === 37) { // Left arrow key\n        // Handle left movement\n      } else if (e.keyCode === 39) { // Right arrow key\n        // Handle right movement\n      } else if (e.keyCode === 38) { // Up arrow key\n        // Handle up movement\n      } else if (e.keyCode === 40) { // Down arrow key\n        // Handle down movement\n      }\n    };\n\n    document.addEventListener('keydown', handleKeyDown);\n\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, []);\n\n  return (\n    <div>\n      {/* Render the spaceship */}\n    </div>\n  );\n};\n\nexport default Spaceship;\n```\n\nIn the above code, we have used the `useEffect` hook to add an event listener for keyboard events. When the component is mounted, it adds the event listener, and when the component is unmounted, it removes the event listener. Inside the `handleKeyDown` function, you can handle the spaceship movement based on the keycode of the arrow keys.\n\n7. Update the App component: Open the `src/App.js` file and update the App component to render the Spaceship component. Here's an example:\n\n```jsx\nimport React from 'react';\nimport Spaceship from './components/Spaceship';\n\nconst App = () => {\n  return (\n    <div>\n      <h1>Spaceship Game</h1>\n      <Spaceship />\n    </div>\n  );\n};\n\nexport default App;\n```\n\n8. Run the application: Save all the changes and start the development server by running the following command in your terminal:\n   ```\n   npm start\n   ```\n\n   This command will start the application and open it in your default web browser.\n\n9. Test the spaceship movement: With the application running, try using the arrow keys on your keyboard to control the spaceship movement. You can add styles to the Spaceship component and implement the spaceship's movement logic as per your requirements.\n\nThat's it! You have now developed a ReactJS application that simulates a spaceship game, allowing users to control the spaceship movement using arrow keys. Feel free to customize and add more features to enhance the game."
    // }
  ]

  );
  const [frameworkValue, setFrameworkValue] = useState("ReactJS");
  const [actionApplication, setActionApplication] = useState("");
  const [systemChatPromptOptimze, setSystemChatPromptOptimze] = useState([]);
  const [helpPromptGuide, setHelpPromptGuide] = useState(1);
  const [lanuageFunction, setLanuageFunction] = useState("Javascript");
  const [actionFunction, setActionFunction] = useState("");
  const [purposeResearch, setPurposeResearch] = useState('Research Paper');
  const [topicResearch, setTopicResearch] = useState('');

  // useEffect(() => {

  //   // Use a regular expression to extract the code snippet
  //   const codeRegex = /```javascript([\s\S]+?)```/; // Match everything between triple backticks with "javascript"
  //   const codeMatch = responseText.match(codeRegex);

  //   if (codeMatch) {
  //     const codeSnippet = codeMatch[1].trim();
  //     console.log(codeSnippet);
  //     props.onChange(codeSnippet);
  //   } else {
  //     console.log('Code snippet not found.');
  //   }

  // }, [])

  const [systemChatHistory, setSystemChatHistory] = useState([]);
  const toggleShowSetting = () => {
    setShowSetting(!showSetting);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const switchHelp = () => {
    if (helpPromptGuide < 4) {
      setHelpPromptGuide(helpPromptGuide + 1);
    }
    else {
      setHelpPromptGuide(1);
    }
  }

  const switchHelpCode = () => {
    if (helpPromptGuide < 2) {
      setHelpPromptGuide(helpPromptGuide + 1);
    }
    else {
      setHelpPromptGuide(1);
    }
  }
  const applySetting = () => {
    if (topic == "function") {
      setAIModel("code-davinci-edit-001");
    }
   else{
      setAIModel("gpt-3.5-turbo");
      setSystemPrompt("You are a AI assistant that try to understand the question like a human. If you have any doubt, ask the user for clarification");
    }

  }


  useEffect(() => {

    handleFileChange();
  }, [props.pdfFileOutside])

  // Function to handle file selection by the user
  const handleFileChange = () => {

    const formData = new FormData();
    formData.append('file', props.pdfFileOutside);

    if (props.pdfFileOutside) {

      const options = {
        headers: {
          'x-api-key': 'sec_0iTwgmTSxNCrveUbpGnQGy9QIo3nylvJ',
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .post('https://api.chatpdf.com/v1/sources/add-file', formData, options)
        .then((response) => {
          console.log('Source ID:', response.data.sourceId);
          setSourceID(response.data.sourceId);
        })
        .catch((error) => {
          console.error('Error:', error.message);
          console.error('Response:', error.response.data);
        });
    }


  };



  const askForQuiz = () => {
    var newChatHistory = [...chatHistory];
    var newChatPDFHistory = { ...chatPDFHistory };
    if (newChatHistory.length == 0) {
      newChatHistory.push({
        'role': "system",
        "content": systemPrompt
      })
    }
    if (Object.keys(newChatPDFHistory).length == 0 && sourceId != null) {
      var firstChat = {
        "referenceSources": true,
        "sourceId": sourceId,
        "messages": []
      }
      newChatPDFHistory = firstChat;
    }
    var newMessage = {
      "role": "user",
      "content": "Generate 5 quiz question that focus more on the content. In the quiz questions, provide me option for me to choose a),b),c),d)"
    }
    console.log(newChatPDFHistory);
    newChatPDFHistory.messages.push(
      newMessage
    )
    const config = {
      headers: {
        'x-api-key': 'sec_0iTwgmTSxNCrveUbpGnQGy9QIo3nylvJ',
        'Content-Type': 'application/json',
      },
    };


    // Send the POST request
    axios
      .post('https://api.chatpdf.com/v1/chats/message', newChatPDFHistory, config)
      .then((response) => {
        console.log('Result:', response.data.content);
        var replyFromChat = {
          "role": "assistant",
          "content": response.data.content
        }
        newChatPDFHistory.messages.push(replyFromChat);
        newChatHistory.push({
          'role': "user",
          "content": "Generating Quiz"
        })
        newChatHistory.push({
          'role': "assistant",
          'content': response.data.content + "Automated References:" + response.data.references
        });

        setChatPDFHistory(newChatPDFHistory);
        setChatHistory(newChatHistory);
        console.log(newChatHistory);
        setPrompt("");

      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }


  const handleClick = async (debugCodeKeyName) => {
    var newPrompt;
    if (helpPromptGuide == 1) {
      newPrompt = prompt;
    }
    else if (helpPromptGuide == 2 && topic != "debug" && topic != "explainCode") {
      newPrompt = `Develop an application in ${frameworkValue} that ${actionApplication}`
    }
    else if (helpPromptGuide == 3 && topic != "debug" && topic != "explainCode") {
      newPrompt = `Write a function in ${lanuageFunction} that ${actionFunction}`
    }
    else if (helpPromptGuide == 4 && topic != "debug" && topic != "explainCode") {
      newPrompt = `Research for ${purposeResearch} on a topic on ${topicResearch}`
    }
    else if (topic == "debug" || topic == "explainCode" && helpPromptGuide != 1) {
      newPrompt = " " + prompt;
      console.log(prompt)
    }

    if (newPrompt.length == 0) {
      alert("No prompt")
    }
    else {
      setLoading(true);

      try {
        console.log(props)
        var newChatHistory = [...chatHistory];
        var newSystemChatHistory = [...systemChatHistory];
        var newSystemChatPromptOptimize = [...systemChatPromptOptimze];
        var newChatPDFHistory = { ...chatPDFHistory }
        if (topic == "research") {
          newPrompt = newPrompt + "\nAfter giving me the answer. Provide me with facts and link on the result that you gave me.\nIn addition, provide me some prompt related to the topic for further discusssion."
          console.log(topic, newPrompt);
        }
        else if (topic == "math") {

        }
        else if (topic == "summaries") {
          newPrompt = `Do not over complicate the paragraph. Understand the following paragraph(s) and rephrase it or summaries it. Note: return a result that is as humanlike as possible. Here is the paragraph(s): ${newPrompt}`
        }
        else if (topic == "code") {
          if (isChecked == true) {
            newPrompt = `/START of current Code/${props.code[props.selectedComponent]}/End of current Code/ Based on the code given,${newPrompt}. Provide me all full code in one file. Give a short explanation on the updates so that a student can understand the changes.`

          }
          else {
            newPrompt = newPrompt + "\nProvide me all the neccessary full code and a short explanation for each steps so that a student can understand."
          }

        }
        else if (topic == "optimize") {
          const autoGeneratePromptResponse = await autoGeneratePrompt(newChatHistory, newSystemChatPromptOptimize, newPrompt);
          console.log('return autogenerate', autoGeneratePromptResponse);
          if (newSystemChatPromptOptimize.length == 0) {
            newSystemChatPromptOptimize.push({
              'role': "system",
              "content": systemPrompt
            })
          }

          newSystemChatPromptOptimize.push({
            'role': "user",
            "content": `test_cases = [\n{\n'prompt': 'Promoting an innovative new fitness app, Smartly',\n},\n{\n'prompt': 'Why a vegan diet is beneficial for your health',\n},\n{\n'prompt': 'Introducing a new online course on digital marketing',\n},\n{\n'prompt': 'Launching a new line of eco-friendly clothing',\n},\n{\n'prompt': 'Promoting a new travel blog focusing on budget travel',\n},\n{\n'prompt': 'Advertising a new software for efficient project management',\n},\n{\n'prompt': 'Introducing a new book on mastering Python programming',\n},\n{\n'prompt': 'Promoting a new online platform for learning languages',\n},\n{\n'prompt': 'Advertising a new service for personalized meal plans',\n},\n{\n'prompt': 'Launching a new app for mental health and mindfulness',\n}\n]\nhere is the description of the user prompt: \"${newPrompt}\".With the examples of the test cases to show how good prompt is like, modify the description of the user prompt and respond with your prompt, and nothing else. Note: test cases are examples. You dont have to combine the ideas of the test cases to the description. Generate 5 prompt, ranking them from best to worse to how well they fit the user prompt`
          })
          if (newChatHistory.length == 0) {
            newChatHistory.push({
              'role': "system",
              "content": systemPrompt
            })
          }
          newChatHistory.push({
            'role': "user",
            "content": newPrompt
          })
          newChatHistory.push({
            'role': "assistant",
            'content': "Auto Generated Prompt:" + autoGeneratePromptResponse[0].message.content
          });
          newSystemChatPromptOptimize.push({
            'role': "assistant",
            'content': autoGeneratePromptResponse[0].message.content
          });
          setChatHistory(newChatHistory);
          setSystemChatPromptOptimze(newSystemChatPromptOptimize);
          setPrompt("");
          setDoubleChecking(false);
          setLoading(false);
          console.log('systemChatPromptOptimize', newSystemChatPromptOptimize);
          console.log('what user see', newChatHistory);
          return;
        }
        else if (topic == "optimizePromptCode") {
          const autoGeneratePromptResponse = await autoGeneratePrompt(newChatHistory, newSystemChatPromptOptimize, newPrompt);
          console.log('return autogenerate', autoGeneratePromptResponse);
          if (newSystemChatPromptOptimize.length == 0) {
            newSystemChatPromptOptimize.push({
              'role': "system",
              "content": systemPrompt
            })
          }
          newSystemChatPromptOptimize.push({
            'role': "user",
            "content": `test_cases = [\n    {\n        'prompt': 'Write a [language] program that [performs task] using [library or algorithm].',\n    },\n    {\n        'prompt': 'Create a [language] script to sort an array of [data type].',\n    },\n    {\n        'prompt': 'Generate a [language] class to model a [real-world object] with these properties: [list of properties].',\n    },\n    {\n        'prompt': 'Develop a [language] function to perform [task] using [methodology or library] with the inputs: [input variables].',\n    },\n    {\n        'prompt': 'Develop a [language] program to read [file type], perform [operations] and write the results to [output format].',\n    },\n    {\n        'prompt': 'Implement a [language] script using [library/API] that retrieves [data type], performs [operation], and then stores it in [database] with a structure of [database schema].',\n    },\n    {\n        'prompt': 'Write a JavaScript function named filterEvenNumbers that takes an array of integers as input and returns a new array with only the odd numbers.',\n    },\n    {\n        'prompt': 'Here’s a function I wrote in Java that finds the prime numbers up to n. Could you suggest any optimizations for better performance?',\n    },\n    {\n        'prompt': 'Write a Python function to calculate the factorial of a given number.',\n    },\n    {\n        'prompt': 'Launching a new app for mental health and mindfulness',\n}]\nhere is the description of the user prompt: \"${newPrompt}\".With the examples of the test cases to show how good prompt is like, modify the description of the user prompt and respond with your prompt, and nothing else. Note: test cases are examples. You dont have to combine the ideas of the test cases to the description. Generate 5 prompt, ranking them from best to worse to how well they fit the user prompt`
          })
          if (newChatHistory.length == 0) {
            newChatHistory.push({
              'role': "system",
              "content": systemPrompt
            })
          }
          newChatHistory.push({
            'role': "user",
            "content": newPrompt
          })
          newChatHistory.push({
            'role': "assistant",
            'content': "Auto Generated Prompt:" + autoGeneratePromptResponse[0].message.content
          });
          newSystemChatPromptOptimize.push({
            'role': "assistant",
            'content': autoGeneratePromptResponse[0].message.content
          });
          setChatHistory(newChatHistory);
          setSystemChatPromptOptimze(newSystemChatPromptOptimize);
          setPrompt("");
          setDoubleChecking(false);
          setLoading(false);
          console.log('systemChatPromptOptimize', newSystemChatPromptOptimize);
          console.log('what user see', newChatHistory);
          return;
        }
        else if (topic == "function") {
          if (isChecked == true) {
          newPrompt =  `/START of current Code/${props.code[props.selectedComponent]}/End of current Code/\nBased on the code given, help the user to fullfit the following requiments: ${newPrompt}. Understand the code entirely and give me the function in javascript`
          }
          else{
            newPrompt =  `Help the user to fullfit the following requiments: ${newPrompt}. Understand the code entirely and give me the function in javascript`

          }
        }
        else if (topic == "debug") {
          if (debugCodeKeyName != null) {
            newPrompt = `/START of current Code/${props.code[debugCodeKeyName]}/End of current Code/` + "\nBased on the code given, debug the code. Go through the code properly and make sure that all the code will work. If there is a mistake, provide me with a new code and give me the reason for it."
          }
          else {
            newPrompt = newPrompt + "\nBased on the code given, debug the code. Go through the code properly and make sure that all the code will work. If there is a mistake, provide me with a new code and give me the reason for it."
          }
        }
        else if (topic == "explainCode") {
          if (debugCodeKeyName != null) {
            newPrompt = `/START of current Code/${props.code[debugCodeKeyName]}/End of current Code/` + "\nBased on the code given, provide as many details as possible in simple terms for a university student to understand and learn. Provide reference code and explaination below for easy references. Provide links or article to visit/read to improve knowledge."
          }
          else {
            newPrompt = newPrompt + "\nBased on the code given, provide as many details as possible in simple terms for a university student to understand and learn. Provide reference code and explaination below for easy references. Provide links or article to visit/read to improve knowledge."
          }
        }


        if (newSystemChatHistory.length == 0) {
          newSystemChatHistory.push({
            'role': "system",
            "content": systemPrompt
          })
        }
        if (newChatHistory.length == 0) {
          newChatHistory.push({
            'role': "system",
            "content": systemPrompt
          })
        }
        if (Object.keys(newChatPDFHistory).length == 0 && sourceId != null) {
          var firstChat = {
            "referenceSources": true,
            "sourceId": sourceId,
            "messages": []
          }
          newChatPDFHistory = firstChat;
        }
        newSystemChatHistory.push({
          'role': "user",
          "content": newPrompt
        })

        if (topic == "debug" && debugCodeKeyName != null) {
          newChatHistory.push({
            'role': "user",
            "content": `Debug ${debugCodeKeyName}`
          })
        }
        else if (topic == "explainCode" && debugCodeKeyName != null) {
          newChatHistory.push({
            'role': "user",
            "content": `Explain ${debugCodeKeyName}`
          })
        }
        else if (topic == "question_quiz") {
          var newMessage = {
            "role": "user",
            "content": prompt
          }
          console.log(newChatPDFHistory);
          newChatPDFHistory.messages.push(
            newMessage
          )
          newChatHistory.push({
            'role': "user",
            "content": prompt
          })

        }
        else {
          newChatHistory.push({
            'role': "user",
            "content": prompt
          })
        }

        if (AIModel == "gpt-3.5-turbo" && topic != "question_quiz") {
          const response = await openai.createChatCompletion({
            model: AIModel,
            messages: newSystemChatHistory,
            temperature: temperatureValue,
            max_tokens: 2000,
            top_p: topPValue,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          newSystemChatHistory.push({
            'role': "assistant",
            'content': response.data.choices[0].message.content
          });
          newChatHistory.push({
            'role': "assistant",
            'content': response.data.choices[0].message.content
          });
          console.log(response.data.choices)
          setChatHistory(newChatHistory);
          setSystemChatHistory(newSystemChatHistory);
          console.log('systemChat', newSystemChatHistory);
          console.log('what user see', newChatHistory);
          setPrompt("");
          if (topic == "math") {
            setDoubleChecking(true);
            const doubleCheckResponse = await doubleCheckingMath(newChatHistory, newSystemChatHistory);
            console.log('return doubleCheck', doubleCheckResponse);
            newChatHistory.push({
              'role': "assistant",
              'content': "Auto Generated Prompt:" + doubleCheckResponse[0].message.content
            });
            newSystemChatHistory.push({
              'role': "assistant",
              'content': doubleCheckResponse[0].message.content
            });
          }
          else if (topic == "code") {
            var responseText = response.data.choices[0].message.content;
            const codeRegex = /```jsx?\n(.*?)\n```/gs;
            const codeMatches = { ...props.code };
            let matchCount = 1;

            let codeMatch;
            if (isChecked == false) {
              while ((codeMatch = codeRegex.exec(responseText)) !== null) {
                const componentCode = codeMatch[1];
                const componentName = `Code ${matchCount}`;

                codeMatches[componentName] = componentCode;
                matchCount++;
              }
            }
            else {
              while ((codeMatch = codeRegex.exec(responseText)) !== null) {
                const componentCode = codeMatch[1];


                codeMatches[`${props.selectedComponent}`] = componentCode;
                matchCount++;
              }
            }


            console.log(codeMatches);
            props.onChange(codeMatches);



            // Now, codeMatches will contain an array of all matched code blocks.

          }
        }
        // else if (topic != "question_quiz") {
        //   console.log('codex start');
        //   const response = await openai.createEdit({
        //     model: "code-davinci-edit-001",
        //     input: props.code[debugCodeKeyName],
        //     instruction: newPrompt,
        //     temperature: 0,
        //     top_p: 1,
        //   });
        //   console.log('codex',response.data.choices[0])
        //   newSystemChatHistory.push({
        //     'role': "assistant",
        //     'content': response.data.choices[0].message.text
        //   });
        //   newChatHistory.push({
        //     'role': "assistant",
        //     'content': response.data.choices[0].message.text
        //   });
        //   setChatHistory(newChatHistory);
        //   setSystemChatHistory(newSystemChatHistory);
        //   console.log('systemChat', newSystemChatHistory);
        //   console.log('what user see', newChatHistory);
        //   setPrompt("");
        // }
        else {

          const config = {
            headers: {
              'x-api-key': 'sec_0iTwgmTSxNCrveUbpGnQGy9QIo3nylvJ',
              'Content-Type': 'application/json',
            },
          };


          // Send the POST request
          axios
            .post('https://api.chatpdf.com/v1/chats/message', newChatPDFHistory, config)
            .then((response) => {
              console.log('Result:', response.data.content);
              var replyFromChat = {
                "role": "assistant",
                "content": response.data.content
              }
              newChatPDFHistory.messages.push(replyFromChat);
              newChatHistory.push({
                'role': "assistant",
                'content': response.data.content + "Automated References:" + response.data.references
              });

              setChatPDFHistory(newChatPDFHistory);
              setChatHistory(newChatHistory);
              setPrompt("");

            })
            .catch((error) => {
              console.error('Error:', error.message);
            });
        }

      } catch (error) {
        console.error(error);
      }
      setDoubleChecking(false);
      setLoading(false);
    }
  };

  function doubleCheckingMath(newChatHistory, newSystemChatHistory) {
    return new Promise(async (resolve, reject) => {
      // Perform some mathematical operation or logic with the input data.
      var doubleNewSystemChatHistory = [...newSystemChatHistory];
      doubleNewSystemChatHistory.push({
        'role': "user",
        "content": "Using the answer/explaination you have given me, run through the question and see if the answer is correct.\nOnly if it is wrong, return me the correct answer/explaintaion else return the phrase `Answer has been double checked by OpenAI`"
      })
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: doubleNewSystemChatHistory,
        temperature: temperatureValue,
        max_tokens: 256,
        top_p: topPValue,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log('doubleChecking', response.data.choices);
      resolve(response.data.choices);
      // Simulate a delay to mimic an asynchronous operation (you can remove this in a real implementation).
      // setTimeout(() => {
      //   // Check if the result meets certain criteria.
      //   if (result >= 10) {
      //     resolve(result); // Resolve the promise with the result.
      //   } else {
      //     reject(new Error("Result is too low")); // Reject the promise with an error.
      //   }
      // }, 1000); // Simulated delay of 1 second (adjust as needed).
    });
  }

  function autoGeneratePrompt(newChatHistory, newSystemChatHistory, newPrompt) {
    return new Promise(async (resolve, reject) => {
      // Perform some mathematical operation or logic with the input data.
      var autoNewSystemChatHistory = [...newSystemChatHistory];
      var autoNewChatHistory = [...newChatHistory];

      autoNewSystemChatHistory.push({
        'role': "system",
        "content": systemPrompt
      })

      if (topic == "optimizePromptCode") {
        autoNewSystemChatHistory.push({
          'role': "user",
          "content": `test_cases = [\n{\n'prompt': 'Write a [language] program that [performs task] using [library or algorithm].',\n},\n{\n'prompt': 'Create a [language] script to sort an array of [data type].',\n},\n{\n'prompt': 'Generate a [language] class to model a [real-world object] with these properties: [list of properties].',\n    },\n    {\n        'prompt': 'Develop a [language] function to perform [task] using [methodology or library] with the inputs: [input variables].',\n    },\n    {\n        'prompt': 'Develop a [language] program to read [file type], perform [operations] and write the results to [output format].',\n    },\n    {\n        'prompt': 'Implement a [language] script using [library/API] that retrieves [data type], performs [operation], and then stores it in [database] with a structure of [database schema].',\n    },\n    {\n        'prompt': 'Write a JavaScript function named filterEvenNumbers that takes an array of integers as input and returns a new array with only the odd numbers.',\n    },\n    {\n        'prompt': 'Here’s a function I wrote in Java that finds the prime numbers up to n. Could you suggest any optimizations for better performance?',\n    },\n    {\n        'prompt': 'Write a Python function to calculate the factorial of a given number.',\n    },\n    {\n        'prompt': 'Launching a new app for mental health and mindfulness',\n}]\nhere is the description of the user prompt: \"${newPrompt}\".With the examples of the test cases to show how good prompt is like, modify the description of the user prompt and respond with your prompt, and nothing else. Note: test cases are examples. You dont have to combine the ideas of the test cases to the description. Generate 5 prompt, ranking them from best to worse to how well they fit the user prompt`
        })
      }
      else {
        autoNewSystemChatHistory.push({
          'role': "user",
          "content": `test_cases = [\n{\n'prompt': 'Promoting an innovative new fitness app, Smartly',\n},\n{\n'prompt': 'Why a vegan diet is beneficial for your health',\n},\n{\n'prompt': 'Introducing a new online course on digital marketing',\n},\n{\n'prompt': 'Launching a new line of eco-friendly clothing',\n},\n{\n'prompt': 'Promoting a new travel blog focusing on budget travel',\n},\n{\n'prompt': 'Advertising a new software for efficient project management',\n},\n{\n'prompt': 'Introducing a new book on mastering Python programming',\n},\n{\n'prompt': 'Promoting a new online platform for learning languages',\n},\n{\n'prompt': 'Advertising a new service for personalized meal plans',\n},\n{\n'prompt': 'Launching a new app for mental health and mindfulness',\n}\n]\nhere is the description of the user prompt: \"${newPrompt}\".With the examples of the test cases to show how good prompt is like, modify the description of the user prompt and respond with your prompt, and nothing else. Note: test cases are examples. You dont have to combine the ideas of the test cases to the description. Generate 5 prompt, ranking them from best to worse to how well they fit the user prompt`
        })
      }


      autoNewChatHistory.push({
        'role': "system",
        "content": systemPrompt
      })

      autoNewChatHistory.push({
        'role': "user",
        "content": newPrompt
      })
      console.log(autoNewSystemChatHistory);
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: autoNewSystemChatHistory,
        temperature: temperatureValue,
        max_tokens: 2000,
        top_p: topPValue,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log('autoGenerating', response.data.choices);
      resolve(response.data.choices);
    });
  }

  const hideConverstation = () => {
    setChatHistory([]);
    var newChatConverstationHistory = [...chatConverstationHistory];
    newChatConverstationHistory[currentIndex.current] = chatHistory;
    setChatConverstationHistory(newChatConverstationHistory);
    setShowChatConverstationHistory(true);

  }

  const selectChatHistory = (index) => {
    console.log(index)
    setChatHistory(chatConverstationHistory[index]);
    setShowChatConverstationHistory(false);
  }

  const handleTopicClick = (selectedTopic) => {
    if (selectedTopic == "code") {
      setSystemPrompt("Act as a software developer. Understand the user prompt and solve the problem. If you have any doubt, ask the user for clarification")
    }
    else {
      setSystemPrompt("You are a AI assistant that try to understand the question like a human. If you have any doubt, ask the user for clarification")
    }
    // if(selectedTopic == "function"){
    //   setAIModel("code-davinci-edit-001");
    // }
    // else{
    //   setAIModel("gpt-3.5-turbo");

    // }
    setTopic(selectedTopic);
    props.setTopicOutside(selectedTopic);
  };

  const copyCode = (copiedCode) => {
    navigator.clipboard.writeText(copiedCode).then(() => {
      alert("Code Copied");
    });
  }

  return (
    <div style={{ float: "right", width: "55%" }}>
      <div style={helpPromptGuide == 1 ? { height: "70vh", overflow: "auto" } : { height: "67vh", overflow: "auto" }}>
        <div class="chatContainer">
          {showChatConverstationHistory ?
            chatConverstationHistory.map((indivChoice, index) => {
              return (
                <div style={{ borderBottom: "1px solid #ccc", cursor: "pointer" }} onClick={() => selectChatHistory(index)}>
                  <p>{indivChoice[1].content}</p>
                </div>
              )
            }) : null}

          {chatHistory.length <= 1 && showChatConverstationHistory == true ? null :
            <button style={{ padding: "5px 8px", margin: "5px", borderRadius: "10px", outline: "none", backgroundColor: "transparent", border: "1px solid #ccc", cursor: "pointer" }} onClick={() => hideConverstation()}>Hide</button>
          }
          {chatHistory.length <= 1 && showChatConverstationHistory == false ? null :

            chatHistory.map((indivChoice, index) => {
              if (index != 0) {
                if (indivChoice.role == "assistant") {
                  console.log(indivChoice.content.includes("Auto Generated Prompt:"));
                  return (
                    <div class="message left" style={{ padding: "10px" }}>
                      <img src='./openai.png' style={{ width: "3%" }}></img>
                      <p style={{ textAlign: "justify", marginLeft: "2%", width: "95%" }}>
                        {indivChoice.content.includes("Auto Generated Prompt:") == true ?
                          <p style={{ backgroundColor: "#c1c1c1", color: "black", textAlign: "center", padding: "8px 5px 8px 5px", borderRadius: "10px" }}>Auto Generated Prompt</p>
                          : null}
                        {indivChoice.content.includes('```') ?
                          (
                            <>
                              {/* {console.log('out', indivChoice.content.match(/```(javascript|jsx)([\s\S]+?)```/))} */}
                              <div style={{ paddingBottom: '10px' }}>
                                {indivChoice.content.split('```').map((part, index) => (
                                  index % 2 === 0 ? (
                                    part.split('\n').map((line, i) => (
                                      <p key={i}>{line}</p>
                                    ))
                                  ) : (
                                    <div key={index} style={{ position: 'relative', padding: '5px' }}>
                                      <i
                                        className="fa-regular fa-copy"
                                        style={{
                                          position: 'absolute',
                                          top: '0',
                                          right: '0',
                                          paddingTop: '15px',
                                          paddingRight: '40px',
                                          zIndex: '1',
                                          color: 'white',
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => copyCode(part.trim())}
                                      ></i>
                                      <CodeMirror
                                        value={part.trim()}
                                        maxHeight="30vh"
                                        theme="dark"
                                        extensions={[javascript({ jsx: true })]}
                                      />
                                    </div>
                                  )
                                ))}
                              </div>
                            </>
                          ) :
                          indivChoice.content.includes("Auto Generated Prompt:") == true ?
                            //auto prompt
                            indivChoice.content.split('Auto Generated Prompt:')[1].split('\n').map((item, key) => (
                              item.includes("1.") || item.includes("2.") || item.includes("3.") || item.includes("4.") || item.includes("5.") ?
                                <p key={key} className='autoPrompt'>
                                  {item}
                                  {console.log(item)}
                                  {/* <br /> */}
                                </p>
                                :
                                <p key={key} >
                                  {item}
                                  {console.log('here', item)}
                                  {/* <br /> */}
                                </p>
                            )) :
                            indivChoice.content.split('\n').map((item, key) => (

                              <p key={key}>
                                {console.log('looking here', item)}


                                {item}
                                {/* <br /> */}
                              </p>
                            ))}
                      </p>
                    </div>
                  )
                }
                else {
                  return (

                    <div class="message right" style={{ padding: "10px" }}>

                      <p style={{ textAlign: "justify", maxWidth: "93%", marginRight: "2%" }}>
                        {indivChoice.content.split('\n').map((item, key) => (
                          <span key={key}>

                            {item}
                            <br />
                          </span>
                        ))}
                      </p>
                      <i class="fa-solid fa-circle-user" style={{ width: "5%", fontSize: "1.5em" }}></i>
                    </div>
                  )
                }

              }

            })}
        </div>
        <pre className="result">{result}</pre>
      </div>
      {showSetting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent grey overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Your popup content */}
          <div
            id="popupContent"
          >
            <div className="notification-close" onClick={toggleShowSetting}>
              ×
            </div>
            <div className='popupDiv'>
              <label className='popup_label'>Task Topic: </label>
              <select className='popup_Select' value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option value={"research"}>Research Paper</option>
                <option value={"math"}>Math Question</option>
                <option value={"code"}>Coding Question</option>
                <option value={"summaries"}>Summaries and rephrasing</option>
                <option value={"others"}>Others</option>
              </select>
            </div>

            <div className='popupDiv'>
              <label className='popup_label'>Temperature: </label>
              <p>{temperatureValue}</p>
              <input
                type="range"
                id="slider"
                min="0"
                max="2"
                step="0.1" // Set the step attribute to 0.1
                value={temperatureValue}
                onChange={(e) => setTemperatureValue(e.target.value)}
              ></input>
            </div>
            <div className='popupDiv'>
              <label className='popup_label'>Top P: </label>
              <p>{topPValue}</p>
              <input
                type="range"
                id="slider"
                min="0"
                max="1"
                step="0.1" // Set the step attribute to 0.1
                value={topPValue}
                onChange={(e) => setTopPValue(e.target.value)}
              ></input>
            </div>
            <button style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              margin: "15px",
              padding: "8px 5px 8px 5px",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "transparent"
            }}
              onClick={() => applySetting()}>Apply</button>
          </div>
        </div>
      )}
      <div style={{ borderTop: '1px solid #c1c1c1', padding: '0px 5px 0px 5px' }}>
        <div style={{ textAlign: "left", marginBottom: "0.5%", marginTop: "1.5%", position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "block" }}>
              <p style={{ margin: "0", marginLeft: "10px", color: "grey", fontWeight: "bold", display: "flex" }}>Task</p>
              <select value={topic} onChange={(e) => { handleTopicClick(e.target.value) }} style={{ margin: "0px 10px 10px 10px", padding: "5px 5px 5px 5px", borderRadius: "10px" }}>
                <option value={"optimize"}>Optimize Prompt</option>
                <option value={"optimizePromptCode"}>Optimize Prompt for code</option>
                <option value={"research"}>Research</option>
                <option value={"math"}>Math</option>
                <option value={"summaries"}>Summaries and rephrasing</option>
                <option value={"code"}>Generate Code</option>
                <option value={"function"}>Generate function</option>
                <option value={"debug"}>Debug</option>
                <option value={"explainCode"}>Code Explaination</option>
                <option value={"question_quiz"}>Questions & Quiz</option>
              </select>
            </div>

            {topic == "question_quiz" && sourceId != null ? <div style={{ display: "block" }}>
              <p style={{ margin: "0", color: "grey", fontWeight: "bold", display: "flex" }}>Quiz Questions</p>
              <button type="file" onClick={() => {askForQuiz()}}>Generate Quiz</button>
            </div> : null}
          </div>
          <div style={{ position: "absolute", top: "0", right: "0", marginRight: "10px" }}>
            {(topic == "code" || topic == "function" || topic == "debug" || topic == "explainCode") && props.selectedComponent != null ? <><label style={{ marginRight: "10px" }}>
              <input type="checkbox" name="referenceCode" value={isChecked} onChange={handleCheckboxChange} />
              <span className="checkbox-label">Reference to current code</span>
            </label>
            </> : null}
            {topic != "debug" && topic != "explainCode" ?
              <i class="fa-solid fa-arrows-rotate" style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => switchHelp()}></i>
              :
              <i class="fa-solid fa-arrows-rotate" style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => switchHelpCode()}></i>}

          </div>
          {/* <button
            className={topic === "research" ? 'topicBtnSelect' : 'topicBtn'}
            onClick={() => handleTopicClick("research")}
          >
            Research paper
          </button>
          <button
            className={topic === "math" ? 'topicBtnSelect' : 'topicBtn'}
            onClick={() => handleTopicClick("math")}
          >
            Math Questions
          </button>
          <button
            className={topic === "code" ? 'topicBtnSelect' : 'topicBtn'}
            onClick={() => handleTopicClick("code")}
          >
            Coding Questions
          </button>
          <button
            className={topic === "summaries" ? 'topicBtnSelect' : 'topicBtn'}
            onClick={() => handleTopicClick("summaries")}
          >
            Summaries and rephrasing
          </button>
          <button
            className={topic === "others" ? 'topicBtnSelect' : 'topicBtn'}
            onClick={() => handleTopicClick("others")}
          >
            Others
          </button> */}
        </div>

        <div style={{ marginLeft: "10px" }}>

          {/* <i
            className="fa-solid fa-gear"
            style={{ fontSize: '24px', width: "5%", cursor: 'pointer' }}
            onClick={() => toggleShowSetting()}
          /> */}

          <div style={helpPromptGuide == 1 ? { width: "98%", display: "flex", flexDirection: "row", border: "1px solid #c1c1c1", borderRadius: "10px" } : { width: "98%", textAlign: "left" }}>
            {topic != "debug" && topic != "explainCode" ?
              helpPromptGuide == 1 ?
                <textarea
                  style={{
                    width: '90%',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '5px',
                    height: "50px",
                    resize: "none",
                    outline: "none"
                  }}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Write your prompt.."
                  className="textarea"
                ></textarea>
                :
                helpPromptGuide == 2 ?
                  <>
                    <p style={{ margin: "0", fontWeight: "bold" }}>Develop an application in</p>
                    <div style={{ float: "left", width: "47.5%" }}>
                      <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px" }}>Framework</p>
                      <select value={frameworkValue} onChange={(e) => { setFrameworkValue(e.target.value) }} style={{ padding: "5px", borderRadius: "10px", width: "90%", outline: "none" }}>
                        <option value={"ReactJS"}>ReactJS</option>
                        <option value={"Ruby"}>Ruby</option>
                        <option value={"Angular"}>Angular</option>
                        <option value={"Spring"}>Spring</option>
                      </select>
                    </div>
                    <div style={{ float: "left", width: "47.5%" }}>
                      <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px" }}>that</p>
                      <input style={{ width: "100%", borderRadius: "10px", border: "1px solid #c1c1c1", outline: "none", padding: "5px" }} value={actionApplication} onChange={(e) => setActionApplication(e.target.value)}></input></div>
                  </>
                  :
                  helpPromptGuide == 3 ?
                    <>
                      <p style={{ margin: "0", fontWeight: "bold" }}>Write a function in</p>
                      <div style={{ float: "left", width: "47.5%" }}>
                        <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px", width: "90%", outline: "none" }}>Function</p>
                        <select value={lanuageFunction} onChange={(e) => { setLanuageFunction(e.target.value) }} style={{ padding: "5px", borderRadius: "10px", width: "90%", outline: "none" }}>
                          <option value={"Javascript"}>Javascript</option>
                          <option value={"Python"}>Python</option>
                          <option value={"Java"}>Java</option>
                        </select>
                      </div>
                      <div style={{ float: "left", width: "47.5%" }}>
                        <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px", width: "90%", outline: "none" }}>that</p>
                        <input style={{ width: "100%", borderRadius: "10px", border: "1px solid #c1c1c1", outline: "none", padding: "5px" }} value={actionFunction} onChange={(e) => setActionFunction(e.target.value)}></input></div>
                    </>
                    :
                    helpPromptGuide == 4 ?
                      <>
                        <p style={{ margin: "0", fontWeight: "bold" }}>Research on the topic</p>
                        <div style={{ float: "left", width: "47.5%" }}>
                          <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px" }}>Purpose</p>
                          <select style={{ padding: "5px", borderRadius: "10px", width: "90%", outline: "none" }} value={purposeResearch} onChange={(e) => {setPurposeResearch(e.target.value)}}>
                            <option value={'Research Paper'}>Research Paper</option>
                            <option value={'Project'}>Project</option>
                            <option value={'Self Knowledge'}>Self Knowledge</option>
                          </select>
                        </div>
                        <div style={{ float: "left", width: "47.5%" }}>
                          <p style={{ margin: "0", color: "grey", marginBottom: "5px", marginTop: "10px" }}>Topic</p>
                          <input style={{ width: "100%", borderRadius: "10px", border: "1px solid #c1c1c1", outline: "none", padding: "5px" }} value={topicResearch} onChange={(e) => setTopicResearch(e.target.value)}></input></div>
                      </>
                      :
                      null : null}
            {topic == "debug" || topic == "explainCode" ?
              helpPromptGuide == 1 ?
                <textarea
                  style={{
                    width: '90%',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '5px',
                    height: "50px",
                    resize: "none",
                    outline: "none"
                  }}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Write your prompt.."
                  className="textarea"
                ></textarea>
                :
                helpPromptGuide == 2 ?
                  <>
                    {Object.keys(props.code).length != 0 ? Object.keys(props.code).map((indivKey) => (
                      <button style={{ backgroundColor: "transparent", padding: "5px", margin: "5px", border: "1px solid #c1c1c1", borderRadius: "10px", cursor: "pointer" }}
                        onClick={() => { setPrompt(" "); handleClick(indivKey); }}>{indivKey}</button>

                    )) : <p>No Code Provided</p>}
                  </>
                  : null : null}

            {topic == "question_quiz" ?
              <>

              </> : null}

            {(topic == "debug" || topic == "explainCode") && helpPromptGuide == 2 ?
              loading ? <div class="fa-regular" style={helpPromptGuide == 1 ? { display: "flex", justifyContent: "center", alignItems: "center", width: "10%" } : { float: "left", width: "5%", textAlign: "center" }}>
                <i class="fas fa-spinner fa-spin" ></i>
              </div> : null :
              loading ? <div class="fa-regular" style={helpPromptGuide == 1 ? { display: "flex", justifyContent: "center", alignItems: "center", width: "10%" } : { float: "left", width: "5%", textAlign: "center" }}>
                <i class="fas fa-spinner fa-spin" ></i>
              </div>
                : <i class="fa-regular fa-paper-plane" style={helpPromptGuide == 1 ? { display: "flex", justifyContent: "center", alignItems: "center", width: "10%" } : { float: "left", width: "5%", textAlign: "center" }} onClick={() => { handleClick(null) }}></i>}

          </div>
        </div>
        {/* <div style={{ textAlign: "right", marginBottom: "0.5%" }}>
          <button className='topicBtn' style={{ backgroundColor: "#484c58", color: "white" }}>Auto Sync</button>
        </div> */}
      </div>

      {/* <button
        style={{ position: "absolute", right: "0", marginRight: "2%", borderRadius: "7px", marginTop: "1%" }}
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
      >
        {loading ? "Generating..." : "Send"}
      </button> */}


    </div>

  );

};

export default AIChatbot;
