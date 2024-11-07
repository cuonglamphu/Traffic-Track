# Traffic Track - Restaurant Seat Availability System

## Overview

Traffic Track is a real-time restaurant seat monitoring system built with Next.js 13+. It allows users to check seat availability at various restaurants by viewing the live video stream of the restaurant, view menus, and provide feedback about their experience.

## Features

-   🪑 Real-time seat availability monitoring
-   🍽️ Digital menu viewing system
-   📊 Visitor counting system
-   💬 Customer feedback system
-   🎨 Retro pixel art design
-   📱 Responsive layout

## Tech Stack

-   **Framework**: Next.js 13+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Real-time Updates**: Socket.IO
-   **Image Optimization**: Next.js Image Component
-   **State Management**: React Hooks

## Prerequisites

-   Node.js 18.17 or later
-   npm or yarn
-   RTSP server for streaming (for development)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/traffic-track.git
    cd traffic-track
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create necessary configuration files:

    ```bash
    # Create a visitors.json file in the root directory
    echo '{"count": 0}' > visitors.json
    ```

4.  Copy .env.example to .env and set the environment variables

        ```bash

    NEXT_PUBLIC_APP_URL=
    MONGODB_URI=

    ```

5.  Start the development server:

    ```bash
    npm run dev:all
    # or
    yarn dev:all
    ```

## Contributing

We welcome contributions to enhance Traffic Track. To contribute:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bugfix.
3. Make your changes, ensuring the code is well-commented and documented.
4. Test your changes to verify everything works as expected.
5. Submit a pull request, providing a clear description of the modifications made.

### Contribution Guidelines

-   Follow the existing coding style and conventions.
-   Write concise, meaningful commit messages.
-   Document any new methods, components, or features added.
-   Ensure your code passes all tests before submitting.

## Reporting Issues

If you encounter any issues or bugs with Traffic Track, please report them using the [GitHub Issues](https://github.com/cuonglamphu/traffic-track/issues) tab. Provide as much detail as possible:

-   A clear and descriptive title
-   Steps to reproduce the issue
-   Expected vs. actual behavior
-   Screenshots or logs, if applicable

We appreciate your feedback and will strive to resolve issues promptly.

## Brief view

![image](https://github.com/user-attachments/assets/386cfa5c-9cc7-4859-838e-5604af78011e)
![image](https://github.com/user-attachments/assets/803bc215-d366-4266-a6c1-847367e59fe0)
![image](https://github.com/user-attachments/assets/f2380a48-ec26-4cbb-952e-81f409567ae3)
![image](https://github.com/user-attachments/assets/4ca70b9c-fb76-4e41-8f8a-5c0988b492fa)
![image](https://github.com/user-attachments/assets/7c6f6af8-6ce0-43e6-a2db-a9444a350f8e)

## License

This project is proprietary and confidential. All rights reserved.
