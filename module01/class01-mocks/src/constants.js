exports.constants = {
  error: {
    NON_EXISTENT_FILE: "ENOENT: no such file or directory, open '$path'",
    EMPTY_FILE: "File cannot be empty",
    PARTIAL_HEADERS: "File is missing the following headers: $headers",
    NO_ENTRIES: "File must contain at least 1 entry",
    TOO_MANY_ENTRIES: "File cannot contain more than $amount entries",
    REQUIRED_VALUES: "Value of header $header at line $line must not be empty",
    INVALID_ID: "Header id at line $line must be an integer greater than 0",
    DUPLICATE_ID: "Duplicate id $id at line $line",
  },
  headers: {
    all: ["id", "firstName", "lastName", "role", "age"],
    required: ["id", "firstName", "role"],
  },
};
