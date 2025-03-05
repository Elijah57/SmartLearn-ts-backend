import amqp from "amqplib"
import config from "../configs"
import { Ilogs } from "../types"

export const publishLogs = async (log: Ilogs)=>{
    const connection = await amqp.connect(config.RABBITMQ_URL)
    const channel = await connection.createChannel()

    const exchangeName = "logs"

    const routingKey = `logs.${log.level}`
    const msg = log.message
    await channel.assertExchange(exchangeName, "direct", { durable: true})

    if(!log.timestamps){
        log.timestamps = new Date().toISOString()
    }
    
    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(log)))
    console.log(`Direct Exchange: Sent [${routingKey}]: '${msg}'`);

    await channel.close();
    await connection.close()

}

