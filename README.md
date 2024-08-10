# Firebase Notification App

This project is a React + TypeScript application.

## Prerequisites

Before running the project, make sure you have the following software installed on your machine:

- Node.js v18: You can use NVM (Node Version Manager) to install Node.js v18.
  
### Starting the APPLICATION

1. Install project dependencies by navigating to the project directory in your terminal and running the following command:

   ```bash
   npm install
   ```


2. Once the installation is complete, you can start the application by running the following command:

   ```bash
   npm run build
   npm run preview
   ```

   This command will start the development server and provide you with a local URL where you can access the application in your browser.

### Configuring your React Application to be mounted as a child app (Using Vite)

 1. Set up your react app using vite

    ```bash
    npm create vite@latest my-app -- --template react
    ```

 2. Install dependencies

    ```bash
    npm install react react-dom redux react-redux react-router-dom @originjs/vite-plugin-federation
    ```

 3. Update vite config to expose your React app as module

    Here is a code sample on how you can do this:

    ```js
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import federation from "@originjs/vite-plugin-federation";

    export default defineConfig({
      plugins: [
        react(),
        federation({
          name: "remote",
          filename: "remoteEntry.js",
          exposes: {
            "./remote": "./src/App",
          },
          shared: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "react-router-dom",
          ],
        }),
      ],
      build: {
        target: "esnext",
      },
    });

    ```


4. Add the configurations defined in the child React App to frameworkConfig.json present in this project
  
    Example JSON object for the above vite config: 

    ```json
    "remoteApps": [
      {
        "url": "http://example-url/assets/remoteEntry.js",
        "name": "remote",
        "module": "./remote",
        "display_name": "Remote App 1"
      },
    ]
    ```

### Configuring global redux store to be share between apps

 1. In your child app import the store module that is being exposed by this framework:

    Here's a sample code for how you can do this:

    ```js
    import {
      __federation_method_getRemote,
      __federation_method_setRemote,
      // @ts-ignore
    } from "__federation__";

  

    const DynamicRemoteStore = () => {

      __federation_method_setRemote(name, {
        url: () => Promise.resolve(url),
        format: "esm",
        from: "vite",
      });

      const url = "https://host-app-url/assets/remoteEntry.js" // this is the url for the react-ui-framework project
      const name = "store"
      const module: "./store"

      console.log(name, module);

      return __federation_method_getRemote(name, module);
    };

    const MicrofrontendApp = () => {
      const [store, setStore] = useState(null);

      useEffect(() => {
        DynamicRemoteStore().then((storeModule) => {
          setStore(storeModule.store);
        });
      }, []);

      if (!store) {
        return <div>Loading...</div>;
      }

      return (
        <Provider store={store}>
          <YourComponentTree />
        </Provider>
      );
    };
    ```

### Configuring menu options

  1. Add the default configuration to frameworkConfig.json present in this project

      Here's a sample config:

      ```json
      "menuItems": [
        { "text": "Home", "to": "/" },
        { "text": "About", "to": "/about" },
        { "text": "Flow Diagram", "to": "/diagram" },
        { "text": "Contact", "to": "/contact" }
      ],
      ```

  2. To configure the menu items from your child app dispatch an action to the redux store:

      Here's a sample action dispatch:

      ```js
      const dispatch = useDispatch();
      dispatch({ 
        type: "menu/replaceMenuItems", 
        payload:   "menuItems": [
          { "text": "Dashboard", "to": "/" },
          { "text": "Our Vision", "to": "/vision" },
          { "text": "Contact", "to": "/contact" }
        ]}
      )
      ```


### Component Versioning:

  1. Add the component versioning config to the frameworkConfig.json file

      Here's a sample config:

      ```json
      "componentVersions": {
        "formComponent": {
          "version": 2
        }
      },
      ```

  2. Fetch the component versions inside your child app: 

      ```js
      const {formComponent} = useSelector((state) => state.componentVersion.value);
      ```

  3. Lazy load the component version accordingly:

      ```js
      const FormComponent = lazy(() => {
        let component
        switch (Number(formComponent.version)) {
          case 2:
            component = import("./components/contactForm/ContactFormV2")
            break

          // use v1 if v1 configured or no version specified
          case 1:
          default:
            component = import("./components/contactForm/ContactFormV1")
            break
        }
        return component
      })

      return (
        <Suspense fallback="Loading...">
          <FormComponent></FormComponent>
        </Suspense>
      )
      ```