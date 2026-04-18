pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'vrs-dairy/frontend:latest'
        BACKEND_IMAGE = 'vrs-dairy/backend:latest'
        DOCKER_REGISTRY = 'docker.io'
        CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
            
                git branch: 'main', url: 'https://github.com/srisan78/VRS_dairy.git'
            }
        }

        stage('Install Frontend Tools') {
            steps {
                dir('frontend') {
                    // Ensure you are in the correct directory if frontend is in a subfolder
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    // Using a virtual env is safer for Jenkins agents
                    sh '''
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    // Ensure docker-compose.yml exists in the root
                    sh 'docker-compose build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying application using docker-compose..."
                    // -d runs in detached mode so the Jenkins job doesn't hang
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
            cleanWs()
        }
    }
}