terraform {
  required_providers {
    aws ={
      source = "hashicorp/aws"
   
    }
  }

    backend "s3" {
      bucket         = "my-own-project1-bucket-name-2026"
      key            = "terraform.tfstate"
      region         = "us-east-1"
      use_lockfile = true

    }
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "./module/vpc"

  vpc_cidr             = var.vpc_cidr_block
  availability_zones   = var.availability_zones
  private_subnet_cidrs = var.private_subnet_cidr_blocks
  public_subnet_cidrs  = var.public_subnet_cidr_blocks
  cluster_name         = var.cluster_name
}

module "eks" {
  source = "./module/eks"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  node_groups     = var.node_groups
} 