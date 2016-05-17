A few AWS EC2 commands I need to remember.

#### SSH into an EC2 server

```
ssh -i ~/.ssh/aws-first.pem ec2-user@ec2-52-40-3-169.us-west-2.compute.amazonaws.com
```

#### Create a new instance

XXX is the ID of the image.

```
aws ec2 run-instances --image-id ami-XXX --instance-type t2.micro
```