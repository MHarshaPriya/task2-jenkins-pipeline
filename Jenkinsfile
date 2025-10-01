pipeline {
  agent any

  environment {
    DOCKER_PATH = "/usr/local/bin/docker"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build (Docker)') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKERHUB_USERNAME',
                                            passwordVariable: 'DOCKERHUB_TOKEN')]) {
            sh """
              ${DOCKER_PATH} login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_TOKEN
              ${DOCKER_PATH} build -t $DOCKERHUB_USERNAME/nodejs-demo-app:jenkins nodejs-demo-app
            """
          }
        }
      }
    }

    stage('Test (run container)') {
      steps {
        script {
          sh """
            ${DOCKER_PATH} run --rm $DOCKERHUB_USERNAME/nodejs-demo-app:jenkins npm test
          """
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKERHUB_USERNAME',
                                            passwordVariable: 'DOCKERHUB_TOKEN')]) {
            sh """
              ${DOCKER_PATH} login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_TOKEN
              ${DOCKER_PATH} push $DOCKERHUB_USERNAME/nodejs-demo-app:jenkins
            """
          }
        }
      }
    }
  }
}
