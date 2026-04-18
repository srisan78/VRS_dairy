pipeline {
    agent any

    environment {
        // This must match your Docker Hub ID
        DOCKER_USER = 'sridhar76'
        CREDENTIALS_ID = 'dockerhub-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                // Adjust to 'master' if your branch is not named 'main'
                git branch: 'master', url: 'https://github.com/srisan78/VRS_dairy.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building images using Docker Compose..."
                    // This command finds Dockerfile.frontend automatically 
                    // because it is defined in your docker-compose.yml
                    sh 'docker-compose build --no-cache'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
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
                    echo "Starting the Dairy Farm app..."
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo "SUCCESS: Build # ${BUILD_NUMBER} is live!"
        }
        failure {
            echo "FAILED: Check the console log for Build # ${BUILD_NUMBER}"
        }
        always {
            cleanWs()
        }
    }
}