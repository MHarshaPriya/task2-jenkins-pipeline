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
                                            usernameVariable: 'DOCKER_USER',
                                            passwordVariable: 'DOCKER_PASS')]) {
            sh """
              ${DOCKER_PATH} login -u $DOCKER_USER -p $DOCKER_PASS
              ${DOCKER_PATH} build -t $DOCKER_USER/nodejs-demo-app:jenkins nodejs-demo-app
            """
          }
        }
      }
    }

    stage('Test (run container)') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKER_USER',
                                            passwordVariable: 'DOCKER_PASS')]) {
            sh """
              ${DOCKER_PATH} run --rm $DOCKER_USER/nodejs-demo-app:jenkins npm test
            """
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKER_USER',
                                            passwordVariable: 'DOCKER_PASS')]) {
            sh """
              ${DOCKER_PATH} login -u $DOCKER_USER -p $DOCKER_PASS
              ${DOCKER_PATH} push $DOCKER_USER/nodejs-demo-app:jenkins
            """
          }
        }
      }
    }
  }
}
