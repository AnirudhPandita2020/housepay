package com.service.housepay.exceptions;

public class ResidentAlreadyExistsException extends RuntimeException {

    public ResidentAlreadyExistsException(String message) {
        super(message);
    }
}

