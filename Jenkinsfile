pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'vrs-dairy/frontend:latest'
        BACKEND_IMAGE = 'vrs-dairy/backend:latest'
        docker_registry = 'docker.io' // Change this to your registry if not using Docker Hub
        credentials_id = 'dockerhub-credentials' // Jenkins credentials ID for Docker registry
    }

    stages {
        stage('Checkout') {
            steps {
                 branch 'main' git 'https://github.com/srisan78/VRS_dairy.git'
            }
        }

        stage('Install Frontend Tools') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    sh 'docker-compose build'
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
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed! Please check the logs."
        }
        always {
            cleanWs()
        }
    }
}
