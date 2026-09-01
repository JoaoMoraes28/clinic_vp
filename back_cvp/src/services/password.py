import secrets
import string

alphabet = string.ascii_letters + string.digits

password_initial = "".join(secrets.choice(alphabet) for _ in range(10))
