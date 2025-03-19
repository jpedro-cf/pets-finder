rabbit_mq_config = {
    # exchanges
    "PET_EXCHANGE": "pet.v1.events",
    # pet routing keys
    "PET_CREATED_ROUTING_KEY": "pet.created",
    "PET_PROCESSED_ROUTING_KEY": "pet.processed",
    "PET_FAILED_ROUTING_KEY": "pet.failed",
    # similarity routing keys
    "SIMILARITY_REQUESTED_ROUTING_KEY": "similarity.requested",
    "SIMILARITY_COMPLETED_ROUTING_KEY": "similarity.completed",
    "SIMILARITY_FAILED_ROUTING_KEY": "similarity.failed",
    # queues
    "PET_CREATED_QUEUE": "pet.created.queue",
    "SIMILARITY_REQUESTED_QUEUE": "similarity.queue",
}
