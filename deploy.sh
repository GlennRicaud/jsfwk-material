echo "Deploying JSFWK Material..."
mvn clean install -q
echo "JSFWK Material deployed"
cd ../data-toolbox-base && ./deploy.sh
