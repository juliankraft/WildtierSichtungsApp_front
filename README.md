## WildTierSichtungsApp - Frontend

**Author:**         Julian Kraft   
**Institution:**    Zurich University of Applied Sciences (ZHAW)
**Program:**        BSc Natural Resource Sciences
**Course:**         Angewandte Geoinformatik
**Project:**        Semester Project  
**Date:**           2024-12-18

### Abstract

The project aimed to evaluate the accessibility of modern technology for creating a web application 
that records geotagged data. Using modern web frameworks, a prototype was developed to document wildlife sightings. 
This application, accessible online and installable on smartphones across major operating systems, 
exemplifies how a straightforward and purpose-driven tool can be built with moderate programming knowledge, 
guided support, and persistence. The project's workflow encompassed backend development in Go, 
frontend design with the Ionic framework, and database integration using MariaDB. Additionally, 
the system incorporates a public data visualization tool and direct database access. 
While the project highlights the potential of current technologies and AI-powered tools like GitHub Copilot, 
it underscores challenges in managing interconnected components. The result is a versatile platform, 
demonstrating both the promise and complexity of custom web application development for geospatial data collection.

### Repository Content

This reository contains the frontend of the WildTierSichtungsApp.

### Repository Structure

/src                # Source files for the application
  /app              # Main application module and components
  /assets           # Static assets like images and styles
  /environments     # Environment-specific configuration files
  index.html        # Main HTML file
  main.ts           # Main entry point for the application
  styles.css        # Global styles
/public             # Public assets
/www                # Compiled output for deployment
angular.json        # Angular CLI configuration
package.json        # Node.js dependencies and scripts
README.md           # Project documentation

### Additional Resources:

- Backend: [WildTierSichtungsApp-Backend](https://github.com/juliankraft/WildtierSichtungsApp_back)
- Documentation: [WildTierSichtungsApp-Documentation](https://github.com/juliankraft/WildtierSichtungsApp_documentation)

### License

This project is licensed under the Creative Commons Zero v1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details.