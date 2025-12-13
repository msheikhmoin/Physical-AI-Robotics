import logging
import os
from datetime import datetime

def setup_logging(log_directory="logs", log_file_name=None, level=logging.INFO):
    """
    Sets up logging to console and a file.

    Args:
        log_directory (str): The directory where log files will be stored.
        log_file_name (str, optional): The name of the log file. If None, a timestamped name will be used.
        level (int): The logging level (e.INFO, logging.DEBUG, etc.).
    """
    # Create log directory if it doesn't exist
    if not os.path.exists(log_directory):
        os.makedirs(log_directory)

    # Set up log file path
    if log_file_name is None:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        log_file_path = os.path.join(log_directory, f"app_{timestamp}.log")
    else:
        log_file_path = os.path.join(log_directory, log_file_name)

    # Configure the root logger
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(),  # Log to console
            logging.FileHandler(log_file_path)  # Log to file
        ]
    )

    # Example usage:
    # logger = logging.getLogger(__name__)
    # logger.info("Logging setup complete.")

if __name__ == '__main__':
    setup_logging()
    logger = logging.getLogger(__name__)
    logger.info("This is an info message from the main block.")
    logger.debug("This is a debug message (won't be shown by default INFO level).")
    logger.warning("This is a warning message.")
    logger.error("This is an error message.")
    logger.critical("This is a critical message.")