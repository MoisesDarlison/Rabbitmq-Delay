# Simple project with RabbitMQ

# _Message delay in RabbitMQ_

Every project was based on the links below: <br />
https://github.com/rabbitmq/rabbitmq-delayed-message-exchange <br />
https://www.cloudamqp.com/blog/rabbitmq_delayed_message_exchange_plugin_with_node_js.html <br />

### Requires

- Docker
- Docker compose
- Node

`git clone https://github.com/MoisesDarlison/Rabbitmq-Delay.git`

In project open the terminal and execute
`npm i`
<br/>

## Start this project with at initialize RabbitMQ in Docker

<br/>

`docker-compose up -d`

Verify in docker application by cmd or application docker <br/>
![Docker command line](https://github.com/MoisesDarlison/Rabbitmq-Delay/blob/main/images/Docker_ps.png)
<br/> or <br/> <br/>
![Docker in windows 11](https://github.com/MoisesDarlison/Rabbitmq-Delay/blob/main/images/Docker_win11.png)

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

View in rabbitMQ the exchanges and the amount of messages with delay <br/>
![exchanges](https://github.com/MoisesDarlison/Rabbitmq-Delay/blob/main/images/List_Exchanges.png) <br />
![amount exchanges](https://github.com/MoisesDarlison/Rabbitmq-Delay/blob/main/images/Msg_amount.png) <br />

## _OBS:_

To remove all message delayed, because they only appear in the queue after delay time <br/>
`rabbitmq-plugins disable rabbitmq_delayed_message_exchange` <br/>
`rabbitmq-plugins enable rabbitmq_delayed_message_exchange`

Expected outcome <br/>
![Result](https://github.com/MoisesDarlison/Rabbitmq-Delay/blob/main/images/Result.png)
