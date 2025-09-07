# Bunker

Bunker is a project developed in TypeScript, JavaScript, and Python that aims to create a data hub for IoT (Internet of Things) systems. The project provides a robust platform for managing, ingesting, and querying data from various IoT devices.

## Main Features

1. **Data Schema Registration**: Users can define data schemas to structure the information collected from IoT devices, ensuring consistency and validation.

2. **Device Model Registration**: Users can register different IoT device models to be integrated into the system, allowing for flexible device management.

3. **Device Registration**: Users can add individual IoT devices that will send data to the system, enabling device-level tracking and management.

4. **Data Query API**: The system offers a REST API for users to query data collected from IoT devices, supporting integration with dashboards, analytics, and other applications.

5. **Data Ingestion via MQTT**: The project includes a service for ingesting data using the MQTT protocol, allowing IoT devices to send data asynchronously and efficiently.

6. **Data Ingestion via REST**: In addition to MQTT, the project also provides a REST API for data ingestion, making it compatible with a wide range of IoT devices and applications.

## Additional Information

- **Technology Stack**: The backend is built with TypeScript, JavaScript, and Python, leveraging modern frameworks and libraries for scalability and reliability.
- **Extensibility**: The architecture is designed to be modular, making it easy to add new device types, data sources, or integrations.
- **Security**: The system supports secure data transmission and authentication for device and user access.
- **Documentation**: API documentation and usage examples are available in the `/docs` directory (if present).

## Running the Project

To run the project, use the `docker-compose.yml` file provided in the repository. On Windows, execute the following commands in PowerShell:

```powershell
$env:HOST_INTERNAL_IP="host.docker.internal"
$env:HOST_EXTERNAL_IP="localhost"

docker-compose up -d --force-recreate
```

This will start all necessary services in detached mode.

## Contribution

Contributions are welcome! Feel free to open issues, submit pull requests, or contact the development team for collaboration.

## License

This project is licensed under the MIT License.