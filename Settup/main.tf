provider "aws" {
   region = "us-east-1"
}

resource "aws_s3_bucket" "my_bucket" {
   bucket = "my-own-project1-bucket-name-2026"
   force_destroy = false
   
   lifecycle {
      prevent_destroy = true
   }   
}



resource "aws_s3_bucket_versioning" "my_bucket_versioning" {
   bucket = aws_s3_bucket.my_bucket.id
   versioning_configuration {
      status = "Enabled"
   }
}  


resource "aws_s3_bucket_public_access_block" "my_bucket_public_access_block" {
   bucket = aws_s3_bucket.my_bucket.id
   block_public_acls = true
   block_public_policy = true
   ignore_public_acls = true
   restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "my_bucket_encryption" {
  bucket = aws_s3_bucket.my_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# terraform {
#   backend "s3"{
#     bucket       = "my-own-project-bucket-name-2024"
#     key          = "eks/terraform.tfstate"
#     region       = "us-east-1"

#     use_lockfile = true
#   }
# }

# resource "aws_dynamodb_table" "my_table" {
#    name = "my-dynamodb-table"
#    billing_mode = "PAY_PER_REQUEST"
#    hash_key = "LockID"

#    attribute {
#       name = "LockID"
#       type = "S"
#    }
# }