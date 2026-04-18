pipeline {
    agent any

    environment {
        DOCKER_USER = 'sridhar76'
        CRED_ID = 'dockerhub-credentials'
        // Unique tags using the Jenkins build number
        FRONT_IMAGE = "${DOCKER_USER}/vrs-frontend:${BUILD_NUMBER}"
        BACK_IMAGE  = "${DOCKER_USER}/vrs-backend:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Ensure the branch name matches your GitHub (main or master)
                git branch: 'master', url: 'https://github.com/srisan78/VRS_dairy.git'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo "Building Frontend with Node 20..."
                    // -f points to the specific frontend file
                    sh "docker build --no-cache -f Dockerfile.frontend -t ${FRONT_IMAGE} ."
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    echo "Building Backend from sub-folder..."
                    // Points to the ./backend folder context
                    sh "docker build -t ${BACK_IMAGE} ./backend"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${CRED_ID}", passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push ${FRONT_IMAGE}"
                        sh "docker push ${BACK_IMAGE}"
                        
                        // Also tagging as 'latest' for convenience
                        sh "docker tag ${FRONT_IMAGE} ${DOCKER_USER}/vrs-frontend:latest"
                        sh "docker tag ${BACK_IMAGE} ${DOCKER_USER}/vrs-backend:latest"
                        sh "docker push ${DOCKER_USER}/vrs-frontend:latest"
                        sh "docker push ${DOCKER_USER}/vrs-backend:latest"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Successfully built and pushed Build #${BUILD_NUMBER}"
        }
        always {
            cleanWs()
        }
    }
}