provider "aws" {
  region = "us-east-1"  # Adjust as needed
  access_key = "AKIAXLEKZJVVVPPLO3U7"
  secret_key = "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"
}




# Generate a new RSA SSH key pair
resource "tls_private_key" "noops_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Create an AWS key pair from the generated public key
resource "aws_key_pair" "noops_key" {
  key_name   = "noops-studio-key"
  public_key = tls_private_key.noops_key.public_key_openssh
}

# Retrieve the latest Ubuntu 22.04 LTS ARM AMI from Canonical
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical's owner ID
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-arm64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Create a security group with required ingress rules
resource "aws_security_group" "noops_sg" {
  name        = "noops-studio-sg"
  description = "Allow SSH, HTTP, HTTPS, MySQL, and application ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3002
    to_port     = 3002
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3003
    to_port     = 3003
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create the EC2 instance using the Ubuntu AMI
resource "aws_instance" "noops_studio_vm" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t4g.2xlarge"
  key_name               = aws_key_pair.noops_key.key_name
  vpc_security_group_ids = [aws_security_group.noops_sg.id]

  tags = {
    Name = "noops-studio-vm"
  }

  user_data = <<-EOF
    #!/bin/bash
    # Update packages and install Docker and dependencies
    sudo apt-get update -y
    sudo apt-get install -y docker.io curl
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker ubuntu

    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
  EOF

  connection {
    type        = "ssh"
    user        = "ubuntu"
    host        = self.public_ip
    private_key = tls_private_key.noops_key.private_key_pem
  }

  # Provisioner to install Git, clone the repository, and run Docker Compose
  provisioner "remote-exec" {
    inline = [
      "sleep 30",  # Wait for user_data installation to complete
      "sudo apt-get update -y && sudo apt-get install -y git",
      "git clone https://github.com/noops-studio/noops-studio-jb-fullstack-4578-114.git",
      "cd noops-studio-jb-fullstack-4578-114/2025-03-18/social-network &&sudo docker-compose up -d"
    ]
  }
}

output "private_key" {
  description = "The generated private key to access the instance via SSH."
  value       = tls_private_key.noops_key.private_key_pem
  sensitive   = true
}
