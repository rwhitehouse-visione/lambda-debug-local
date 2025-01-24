localstack-setup:
	@echo "Setting up LocalStack"
	@docker-compose up -d

setup-test-bucket:
	@echo "Setting up test bucket"
	aws s3 mb s3://my-first-bucket --endpoint-url=http://localhost:4566 --region eu-central-1

setup-test-data:
	@echo "Setting up test data"
	aws s3 cp test-data/test.txt s3://my-first-bucket --endpoint-url=http://localhost:4566 --region eu-central-1
