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
          // Use Jenkins credential 'dockerhub-creds' (username + password/token)
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKERHUB_USERNAME',
                                            passwordVariable: 'DOCKERHUB_TOKEN')]) {
            sh '''
              set -eux

              # create a workspace-local docker config so docker won't try to use
              # docker-credential-desktop (fixes the "docker-credential-desktop not found" error)
              mkdir -p "$WORKSPACE/.docker"

              # create an auth entry (base64); support both GNU and macOS base64
              auth=$(printf "%s:%s" "$DOCKERHUB_USERNAME" "$DOCKERHUB_TOKEN" | base64)
              cat > "$WORKSPACE/.docker/config.json" <<EOF
              {"auths":{"https://index.docker.io/v1/":{"auth":"'$auth'"}}}
              EOF

              # tell docker to use this config
              export DOCKER_CONFIG="$WORKSPACE/.docker"

              # build image and tag with your dockerhub username
              docker build -t "$DOCKERHUB_USERNAME/nodejs-demo-app:jenkins" nodejs-demo-app
            '''
          }
        }
      }
    }

    stage('Test (run container)') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKERHUB_USERNAME',
                                            passwordVariable: 'DOCKERHUB_TOKEN')]) {
            sh '''
              set -eux
              export DOCKER_CONFIG="$WORKSPACE/.docker"
              # run container briefly to execute tests (our test script prints & exits)
              docker run --rm "$DOCKERHUB_USERNAME/nodejs-demo-app:jenkins" npm test
            '''
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                            usernameVariable: 'DOCKERHUB_USERNAME',
                                            passwordVariable: 'DOCKERHUB_TOKEN')]) {
            sh '''
              set -eux
              export DOCKER_CONFIG="$WORKSPACE/.docker"
              docker push "$DOCKERHUB_USERNAME/nodejs-demo-app:jenkins"
            '''
          }
        }
      }
    }
  } // stages
}

