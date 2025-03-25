rabbit_mq_config = {
    # exchanges
    "PET_EXCHANGE": "pet.v1.events",
    # pet routing keys
    "PET_CREATED_ROUTING_KEY": "pet.created",
    "PET_PROCESSED_ROUTING_KEY": "pet.processed",
    "PET_REFRESH_ROUTING_KEY": "pet.refresh",
    "PET_FAILED_ROUTING_KEY": "pet.failed",
    # queues
    "PET_CREATED_QUEUE": "pet.created.queue",
    "PET_REFRESH_QUEUE": "pet.refresh.queue",
}
