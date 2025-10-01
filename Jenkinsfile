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
          sh "${DOCKER_PATH} build -t harshapriya28/nodejs-demo-app:jenkins nodejs-demo-app"
        }
      }
    }

    stage('Test (run container)') {
      steps {
        script {
          sh "${DOCKER_PATH} run --rm harshapriya28/nodejs-demo-app:jenkins npm test"
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          sh "${DOCKER_PATH} login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_TOKEN"
          sh "${DOCKER_PATH} push harshapriya28/nodejs-demo-app:jenkins"
        }
      }
    }
  }
}
