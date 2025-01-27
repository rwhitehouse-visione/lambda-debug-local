localstack-setup:
	@echo "Setting up LocalStack"
	@docker-compose up -d
	make setup-test-bucket
	make setup-test-queue
	make setup-test-data
	make setup-test-message

setup-test-bucket:
	@echo "Setting up test bucket"
	aws s3 mb s3://my-first-bucket --endpoint-url=http://localhost:4566 --region eu-central-1

setup-test-data:
	@echo "Setting up test data"
	aws s3 cp test-data/test.txt s3://my-first-bucket --endpoint-url=http://localhost:4566 --region eu-central-1

setup-test-queue:
	@echo "Setting up test queue"
	aws sqs create-queue --queue-name my-test-queue --endpoint-url=http://localhost:4566 --region eu-central-1

setup-test-message:
	@echo "Setting up test data"
	aws sqs send-message --queue-url http://localhost:4566/000000000000/my-test-queue --endpoint-url=http://localhost:4566 --message-body "This is a test message" --region eu-central-1
