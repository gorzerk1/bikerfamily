# Project Title

The BikerFamily project is a community-oriented app that not only provides information and access to shared trip photos but also integrates with the popular messaging platform, WhatsApp.
The ultimate goal of the project is to facilitate seamless communication among the community members and enhance their shared experience by providing an accessible platform for trip memories.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you can run this project, you will need to install the following software:

1. **Node.js and npm**: Node.js is a JavaScript runtime that is used in the development of this project, and npm is the default package manager for Node.js. You can download Node.js and npm together from the [official Node.js website](https://nodejs.org/). As of my knowledge cut-off in September 2021, the latest LTS version is recommended for most users.

2. **Git**: Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. You can download Git from the [official Git website](https://git-scm.com/downloads).

To install these prerequisites, follow these steps:

**For Windows users:**

1. **Node.js and npm**: Download the installer from the [official Node.js website](https://nodejs.org/), and follow the prompts to install Node.js and npm.

2. **Git**: Download the installer from the [official Git website](https://git-scm.com/downloads), and follow the prompts to install Git.

**For MacOS users:**

1. **Node.js and npm**: It's recommended to use a version manager like nvm. You can install Node.js and npm by running the following commands in the terminal:

    `bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    nvm install node
    `

2. **Git**: Git comes pre-installed on most MacOS machines. You can verify its installation by opening a terminal window and typing:

    `bash
    git --version
    `

**For Linux (Ubuntu) users:**

1. **Node.js and npm**: It's recommended to use a version manager like nvm. You can install Node.js and npm by running the following commands in the terminal:

    `bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    nvm install node
    `

2. **Git**: You can install Git via the terminal with the following command:

    `bash
    sudo apt update
    sudo apt install git
    `

After installation, you can verify that Node.js, npm, and Git are installed correctly by typing the following commands in your terminal or command prompt:

`bash
node --version
npm --version
git --version
`

### Prerequisites

What things you need to install the software and how to install them. For a React app, this is often Node.js and npm. Give examples of how to install these prerequisites.

### Installing

A step by step series of examples that tell you how to get a development environment running.

git clone https://github.com/your-username/your-project.git
cd your-project
npm install
npm start

Now, open your browser and visit `http://localhost:3000`

## Deployment

This project is deployed using Amazon Web Services (AWS), specifically utilizing S3 and EC2 services. Here are the details:

### AWS S3

We use S3 for storing and retrieving project-related data. Our bucket, named 'bikerfamily', is organized with the following directories:

- `hasheight`
- `lowHeight`
- `lowWidth`
- `videos`
- `width`

These directories store various types of media and assets used in our project.

### AWS EC2

We host our application on an EC2 instance with the following configuration:

- **Name:** Frontend
- **Machine Image (AMI):** Amazon Linux 2 AMI
- **Instance Type:** t3.micro

#### EC2 Instance Setup

1. **SSH Key Pair:** You should know the path of the `.pem` file used for this EC2 instance.
2. **Security Group Configuration:** We opened ports 80 and 443 for both IPv4 and IPv6. Port 22 is also opened but is limited to specific IP addresses for security reasons.
3. **Elastic IP:** We use an Elastic IP for domain mapping and ensuring a fixed public IP address for our EC2 instance.

To connect to the EC2 instance, use SSH as follows (for example, in Git Bash):

`bash
cd /<file--path>
ssh -i "<path-to-pem>" ec2-user@ec2-<IP>.eu-south-1.compute.amazonaws.com
`

1. **Install Node.js and npm**
    `
    curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
    sudo yum install -y nodejs
    `

2. **Update the system and install necessary tools**
    `
    sudo yum update -y
    sudo yum install git -y
    sudo amazon-linux-extras install epel -y
    `

3. **Install and start Nginx**
    `
    sudo yum install nginx -y
    sudo systemctl start nginx
    `

4. **Clone the project**
    `
    cd /home/ec2-user
    sudo git clone https://github.com/gorzerk1/bikerfamily
    `

6. **Install project dependencies and build the project**
    `
    sudo npm install
    sudo npm run build
    `

7. **Install Certbot and enable EPEL**
    `
    sudo amazon-linux-extras enable epel
    sudo yum-config-manager --enable epel -y
    sudo yum install certbot python2-certbot-nginx -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
    sudo certbot --nginx
    `

8. **Configure Nginx**
    Edit the Nginx configuration file `/etc/nginx/nginx.conf` to set up your server blocks and domain details.

9. **Apply SSL to your domain**
    `
    sudo certbot --nginx --non-interactive --agree-tos -m <your-email>@gmail.com -d <your-domain>.com -d www.<your-domain>.com
    `

10. **Move your build folder to the Nginx HTML directory**
    `
    sudo cp -r ~/portfolio/build/* /usr/share/nginx/html/
    `
Remember to replace placeholders (like <your-email>@gmail.com, <your-domain>.com) with your specific settings.


## Built With

* [React](https://reactjs.org/) - The web framework used
* [npm](https://www.npmjs.com/) - Dependency Management


## Authors

* **Dima Dubinin** - *Initial work* - [Gorzerk1](https://github.com/gorzerk1)

## Acknowledgments

We're open to constructive feedback, and encourage issue creation or pull requests for improvements.

