output "cluster_endpoint" {
  description = "Endpoint for Amazon EKS control plane"
  value       = module.eks.cluster_endpoint # If using v19/v20 this should work, or use the endpoint below
}

output "cluster_name" {
  description = "The name of the EKS cluster"
  value       = module.eks.cluster_name
}

