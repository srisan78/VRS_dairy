pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'vrs-dairy/frontend:latest'
        BACKEND_IMAGE = 'vrs-dairy/backend:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        /* 
        stage('Deploy') {
            steps {
                // Add deployment steps here (e.g. push to ECR/GCR, deploy to Kubernetes, etc)
            }
        }
        */
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
