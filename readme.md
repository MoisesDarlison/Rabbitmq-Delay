# Simple project with RabbitMQ

# _Message delay in RabbitMQ_ (_IN PROGRESS_)

Every project was based on the links below: <br />
https://github.com/rabbitmq/rabbitmq-delayed-message-exchange <br />
https://www.cloudamqp.com/blog/rabbitmq_delayed_message_exchange_plugin_with_node_js.html <br />

### Requires

- Docker
- Docker compose
- Node

`git clone BLABLABLA`

In project open the terminal and execute
`npm i`
<br/>

## Start this project with at initialize RabbitMQ in Docker

<br/>

`docker-compose up -d`

Verify in docker application by cmd ou application docker
C:\Git\Queue\Docker_ps.png
or
C:\Git\Queue\Docker_win11.png

In the Container terminal, update it and download wget with the commands <br/>
`apt-get update && apt upgrade` and `apt-get wget`

Open rabbit with default credentials:
`user:guest / pass:guest`

## Basic Configs to use rabbitmq_delayed_message_exchange

<br/>

Get the URL of the most up-to-date plugin file with the ".ez" extension from https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases <br/>

Inside the RabbitMQ Container terminal navigate to the /opt/rabbitmq/plugins folder and download the plugin <br/><br/>
ATTENTION: using wget to download using the 'curl -O' command did not work <br/>
wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.11.1/rabbitmq_delayed_message_exchange-XXXXX.ez <br/>

After that just run the command below to enable the plugin: <br/>
`rabbitmq-plugins enable rabbitmq_delayed_message_exchange`

In the project there are two main files. <br/>
The send.js that sends to exchange, and from there it is responsible for playing to the queue. <br/>
And the receive.js that fetches the data in the queue. <br/>
The two run independently.

## _OBS:_

To remove all message delayed, because they only appear in the queue after delay time <br/>
`rabbitmq-plugins disable rabbitmq_delayed_message_exchange` <br/>
`rabbitmq-plugins enable rabbitmq_delayed_message_exchange`
