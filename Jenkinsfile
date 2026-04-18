pipeline {
    agent any

    environment {
        // Updated to use your Docker Hub ID sridhar76
        FRONTEND_IMAGE = 'sridhar76/vrs-dairy-frontend:latest'
        BACKEND_IMAGE = 'sridhar76/vrs-dairy-backend:latest'
        DOCKER_REGISTRY = 'docker.io'
        CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/srisan78/VRS_dairy.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    // FIXED: Removed Python commands, replaced with Node.js
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building all images (Frontend & Backend) using Docker Compose..."
                    // ADDED --no-cache to fix the Tailwind "Native Binding" bug
                   sh 'docker-compose build --no-cache'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // This logs you in so you can actually push your images
                    withCredentials([usernamePassword(credentialsId: "${CREDENTIALS_ID}", passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh 'docker-compose push'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying application using docker-compose..."
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully! App is live."
        }
        failure {
            echo "Pipeline failed! Check the console output."
        }
        always {
            // Cleans up the workspace but keeps the app running in Docker
            cleanWs()
        }
    }
}