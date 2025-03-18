rabbit_mq_config = {
    # exchanges
    "PET_EXCHANGE": "pet.v1.events",
    "FAILED_EXCHANGE": "failed.v1.events",
    # routing keys
    "PET_CREATED_ROUTING_KEY": "pet.created",
    "PET_PROCESSED_ROUTING_KEY": "pet.processed",
    "SIMILARITY_REQUESTED_ROUTING_KEY": "pet.similarity.requested",
    "SIMILARITY_COMPLETED_ROUTING_KEY": "pet.similarity.completed",
    # queues
    "PET_CREATED_QUEUE": "pet.created.queue",
    "SIMILARITY_REQUESTED_QUEUE": "pet.similarity.queue",
}
