pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build (Docker)') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            def app = docker.build("harshapriya28/nodejs-demo-app:jenkins", "nodejs-demo-app")
          }
        }
      }
    }

    stage('Test (run container)') {
      steps {
        script {
          docker.image("harshapriya28/nodejs-demo-app:jenkins").inside {
            sh 'npm test'
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            docker.image("harshapriya28/nodejs-demo-app:jenkins").push()
          }
        }
      }
    }
  }
}
