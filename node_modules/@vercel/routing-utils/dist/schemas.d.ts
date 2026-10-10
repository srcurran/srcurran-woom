export declare const hasSchema: {
    readonly description: "An array of requirements that are needed to match";
    readonly type: "array";
    readonly maxItems: 16;
    readonly items: {
        readonly anyOf: readonly [{
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["type", "value"];
            readonly properties: {
                readonly type: {
                    readonly description: "The type of request element to check";
                    readonly type: "string";
                    readonly enum: readonly ["host"];
                };
                readonly value: {
                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                    readonly anyOf: readonly [{
                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                        readonly type: "string";
                        readonly maxLength: 4096;
                    }, {
                        readonly description: "A condition operation object";
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly minProperties: 1;
                        readonly properties: {
                            readonly eq: {
                                readonly description: "Equal to";
                                readonly anyOf: readonly [{
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly type: "number";
                                }];
                            };
                            readonly neq: {
                                readonly description: "Not equal";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly inc: {
                                readonly description: "In array";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                            };
                            readonly ninc: {
                                readonly description: "Not in array";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                            };
                            readonly pre: {
                                readonly description: "Starts with";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly suf: {
                                readonly description: "Ends with";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly re: {
                                readonly description: "Regex";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly gt: {
                                readonly description: "Greater than";
                                readonly type: "number";
                            };
                            readonly gte: {
                                readonly description: "Greater than or equal to";
                                readonly type: "number";
                            };
                            readonly lt: {
                                readonly description: "Less than";
                                readonly type: "number";
                            };
                            readonly lte: {
                                readonly description: "Less than or equal to";
                                readonly type: "number";
                            };
                        };
                    }];
                };
            };
        }, {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["type", "key"];
            readonly properties: {
                readonly type: {
                    readonly description: "The type of request element to check";
                    readonly type: "string";
                    readonly enum: readonly ["header", "cookie", "query"];
                };
                readonly key: {
                    readonly description: "The name of the element contained in the particular type";
                    readonly type: "string";
                    readonly maxLength: 4096;
                };
                readonly value: {
                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                    readonly anyOf: readonly [{
                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                        readonly type: "string";
                        readonly maxLength: 4096;
                    }, {
                        readonly description: "A condition operation object";
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly minProperties: 1;
                        readonly properties: {
                            readonly eq: {
                                readonly description: "Equal to";
                                readonly anyOf: readonly [{
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly type: "number";
                                }];
                            };
                            readonly neq: {
                                readonly description: "Not equal";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly inc: {
                                readonly description: "In array";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                            };
                            readonly ninc: {
                                readonly description: "Not in array";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                            };
                            readonly pre: {
                                readonly description: "Starts with";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly suf: {
                                readonly description: "Ends with";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly re: {
                                readonly description: "Regex";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly gt: {
                                readonly description: "Greater than";
                                readonly type: "number";
                            };
                            readonly gte: {
                                readonly description: "Greater than or equal to";
                                readonly type: "number";
                            };
                            readonly lt: {
                                readonly description: "Less than";
                                readonly type: "number";
                            };
                            readonly lte: {
                                readonly description: "Less than or equal to";
                                readonly type: "number";
                            };
                        };
                    }];
                };
            };
        }];
    };
};
export declare const transformsSchema: {
    readonly description: "A list of transform rules to adjust a request path, request query parameters, or request/response headers";
    readonly type: "array";
    readonly minItems: 1;
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["type", "op"];
        readonly properties: {
            readonly type: {
                readonly description: "The scope of the transform to apply";
                readonly type: "string";
                readonly enum: readonly ["request.headers", "request.query", "response.headers", "request.path"];
            };
            readonly op: {
                readonly description: "The operation to perform on the target";
                readonly type: "string";
                readonly enum: readonly ["append", "set", "delete"];
            };
            readonly target: {
                readonly description: "The target of the transform";
                readonly type: "object";
                readonly required: readonly ["key"];
                readonly properties: {
                    readonly key: {
                        readonly description: "A value to match against. Can be a string or a condition operation object (without regex support)";
                        readonly anyOf: readonly [{
                            readonly description: "A valid header name (letters, numbers, hyphens, underscores)";
                            readonly type: "string";
                            readonly maxLength: 4096;
                        }, {
                            readonly description: "A condition operation object";
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly minProperties: 1;
                            readonly properties: {
                                readonly eq: {
                                    readonly description: "Equal to";
                                    readonly anyOf: readonly [{
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    }, {
                                        readonly type: "number";
                                    }];
                                };
                                readonly neq: {
                                    readonly description: "Not equal";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                                readonly inc: {
                                    readonly description: "In array";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    };
                                };
                                readonly ninc: {
                                    readonly description: "Not in array";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    };
                                };
                                readonly pre: {
                                    readonly description: "Starts with";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                                readonly suf: {
                                    readonly description: "Ends with";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                                readonly gt: {
                                    readonly description: "Greater than";
                                    readonly type: "number";
                                };
                                readonly gte: {
                                    readonly description: "Greater than or equal to";
                                    readonly type: "number";
                                };
                                readonly lt: {
                                    readonly description: "Less than";
                                    readonly type: "number";
                                };
                                readonly lte: {
                                    readonly description: "Less than or equal to";
                                    readonly type: "number";
                                };
                            };
                        }];
                    };
                };
            };
            readonly args: {
                readonly description: "The arguments to the operation";
                readonly anyOf: readonly [{
                    readonly type: "string";
                    readonly maxLength: 4096;
                }, {
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly items: {
                        readonly type: "string";
                        readonly maxLength: 4096;
                    };
                }];
            };
            readonly env: {
                readonly description: "An array of environment variable names that should be replaced at runtime in the args value";
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 64;
                readonly items: {
                    readonly type: "string";
                    readonly maxLength: 256;
                };
            };
        };
        readonly allOf: readonly [{
            readonly if: {
                readonly properties: {
                    readonly op: {
                        readonly enum: readonly ["append", "set"];
                    };
                };
            };
            readonly then: {
                readonly required: readonly ["args"];
            };
        }, {
            readonly if: {
                readonly allOf: readonly [{
                    readonly properties: {
                        readonly type: {
                            readonly enum: readonly ["request.headers", "response.headers"];
                        };
                    };
                }, {
                    readonly properties: {
                        readonly op: {
                            readonly enum: readonly ["set", "append"];
                        };
                    };
                }];
            };
            readonly then: {
                readonly properties: {
                    readonly target: {
                        readonly properties: {
                            readonly key: {
                                readonly if: {
                                    readonly type: "string";
                                };
                                readonly then: {
                                    readonly pattern: "^[a-zA-Z0-9_-]+$";
                                };
                            };
                        };
                    };
                    readonly args: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                            readonly pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$";
                        }, {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$";
                            };
                        }];
                    };
                };
            };
        }, {
            readonly if: {
                readonly required: readonly ["type"];
                readonly properties: {
                    readonly type: {
                        readonly enum: readonly ["request.headers", "request.query", "response.headers"];
                    };
                };
            };
            readonly then: {
                readonly required: readonly ["target"];
            };
        }, {
            readonly if: {
                readonly required: readonly ["type"];
                readonly properties: {
                    readonly type: {
                        readonly enum: readonly ["request.path"];
                    };
                };
            };
            readonly then: {
                readonly required: readonly ["args"];
                readonly not: {
                    readonly required: readonly ["target"];
                };
                readonly properties: {
                    readonly op: {
                        readonly enum: readonly ["set"];
                    };
                    readonly args: {
                        readonly description: "The runtime-visible request path. Must be an origin-form path without query or fragment.";
                        readonly type: "string";
                        readonly maxLength: 2048;
                        readonly pattern: "^/(?!/)(?!.*[?#\\s\\x00-\\x1F\\x7F]).*$";
                    };
                };
            };
        }];
    };
};
/**
 * An ajv schema for the routes array
 */
export declare const routesSchema: {
    readonly type: "array";
    readonly description: "A list of routes objects used to rewrite paths to point towards other internal or external paths";
    readonly example: readonly [{
        readonly dest: "https://docs.example.com";
        readonly src: "/docs";
    }];
    readonly items: {
        readonly anyOf: readonly [{
            readonly type: "object";
            readonly anyOf: readonly [{
                readonly required: readonly ["src"];
            }, {
                readonly required: readonly ["source"];
            }];
            readonly additionalProperties: false;
            readonly properties: {
                readonly src: {
                    readonly type: "string";
                    readonly maxLength: 4096;
                };
                readonly source: {
                    readonly type: "string";
                    readonly maxLength: 4096;
                };
                readonly dest: {
                    readonly type: "string";
                    readonly maxLength: 4096;
                };
                readonly destination: {
                    readonly anyOf: readonly [{
                        readonly type: "string";
                        readonly maxLength: 4096;
                    }, {
                        readonly description: "A service-targeted destination that delegates routing into a named service from `services`. Identified by the presence of `service`.";
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["service"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "Optional explicit format marker. The destination shape is identified by the `service` property, so `type` is no longer required. When present it must be `service`.";
                                readonly type: "string";
                                readonly enum: readonly ["service"];
                            };
                            readonly service: {
                                readonly description: "A service name identifier.";
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly maxLength: 64;
                                readonly pattern: "^[a-zA-Z]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$";
                            };
                            readonly path: {
                                readonly description: "Routing-only path used to select a route inside the target service. It does not mutate the URL observed by user code.";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                        };
                    }];
                };
                readonly headers: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly minProperties: 1;
                    readonly maxProperties: 100;
                    readonly patternProperties: {
                        readonly '^.{1,256}$': {
                            readonly type: "string";
                            readonly maxLength: 32768;
                        };
                    };
                };
                readonly methods: {
                    readonly type: "array";
                    readonly maxItems: 10;
                    readonly items: {
                        readonly type: "string";
                        readonly maxLength: 32;
                    };
                };
                readonly caseSensitive: {
                    readonly type: "boolean";
                };
                readonly important: {
                    readonly deprecated: true;
                    readonly type: "boolean";
                };
                readonly user: {
                    readonly type: "boolean";
                };
                readonly continue: {
                    readonly type: "boolean";
                };
                readonly override: {
                    readonly deprecated: true;
                    readonly type: "boolean";
                };
                readonly check: {
                    readonly type: "boolean";
                };
                readonly isInternal: {
                    readonly type: "boolean";
                };
                readonly status: {
                    readonly type: "integer";
                    readonly minimum: 100;
                    readonly maximum: 999;
                };
                readonly statusCode: {
                    readonly type: "integer";
                    readonly minimum: 100;
                    readonly maximum: 999;
                };
                readonly locale: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly minProperties: 1;
                    readonly properties: {
                        readonly redirect: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly minProperties: 1;
                            readonly maxProperties: 100;
                            readonly patternProperties: {
                                readonly '^.{1,256}$': {
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                            };
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                        readonly path: {
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                        readonly cookie: {
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                        readonly default: {
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                    };
                };
                readonly middleware: {
                    readonly type: "number";
                };
                readonly middlewarePath: {
                    readonly type: "string";
                };
                readonly middlewareRawSrc: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly has: {
                    readonly description: "An array of requirements that are needed to match";
                    readonly type: "array";
                    readonly maxItems: 16;
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["type", "value"];
                            readonly properties: {
                                readonly type: {
                                    readonly description: "The type of request element to check";
                                    readonly type: "string";
                                    readonly enum: readonly ["host"];
                                };
                                readonly value: {
                                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                    readonly anyOf: readonly [{
                                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    }, {
                                        readonly description: "A condition operation object";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly minProperties: 1;
                                        readonly properties: {
                                            readonly eq: {
                                                readonly description: "Equal to";
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                }, {
                                                    readonly type: "number";
                                                }];
                                            };
                                            readonly neq: {
                                                readonly description: "Not equal";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly inc: {
                                                readonly description: "In array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly ninc: {
                                                readonly description: "Not in array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly pre: {
                                                readonly description: "Starts with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly suf: {
                                                readonly description: "Ends with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly re: {
                                                readonly description: "Regex";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly gt: {
                                                readonly description: "Greater than";
                                                readonly type: "number";
                                            };
                                            readonly gte: {
                                                readonly description: "Greater than or equal to";
                                                readonly type: "number";
                                            };
                                            readonly lt: {
                                                readonly description: "Less than";
                                                readonly type: "number";
                                            };
                                            readonly lte: {
                                                readonly description: "Less than or equal to";
                                                readonly type: "number";
                                            };
                                        };
                                    }];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["type", "key"];
                            readonly properties: {
                                readonly type: {
                                    readonly description: "The type of request element to check";
                                    readonly type: "string";
                                    readonly enum: readonly ["header", "cookie", "query"];
                                };
                                readonly key: {
                                    readonly description: "The name of the element contained in the particular type";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                                readonly value: {
                                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                    readonly anyOf: readonly [{
                                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    }, {
                                        readonly description: "A condition operation object";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly minProperties: 1;
                                        readonly properties: {
                                            readonly eq: {
                                                readonly description: "Equal to";
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                }, {
                                                    readonly type: "number";
                                                }];
                                            };
                                            readonly neq: {
                                                readonly description: "Not equal";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly inc: {
                                                readonly description: "In array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly ninc: {
                                                readonly description: "Not in array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly pre: {
                                                readonly description: "Starts with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly suf: {
                                                readonly description: "Ends with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly re: {
                                                readonly description: "Regex";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly gt: {
                                                readonly description: "Greater than";
                                                readonly type: "number";
                                            };
                                            readonly gte: {
                                                readonly description: "Greater than or equal to";
                                                readonly type: "number";
                                            };
                                            readonly lt: {
                                                readonly description: "Less than";
                                                readonly type: "number";
                                            };
                                            readonly lte: {
                                                readonly description: "Less than or equal to";
                                                readonly type: "number";
                                            };
                                        };
                                    }];
                                };
                            };
                        }];
                    };
                };
                readonly missing: {
                    readonly description: "An array of requirements that are needed to match";
                    readonly type: "array";
                    readonly maxItems: 16;
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["type", "value"];
                            readonly properties: {
                                readonly type: {
                                    readonly description: "The type of request element to check";
                                    readonly type: "string";
                                    readonly enum: readonly ["host"];
                                };
                                readonly value: {
                                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                    readonly anyOf: readonly [{
                                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    }, {
                                        readonly description: "A condition operation object";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly minProperties: 1;
                                        readonly properties: {
                                            readonly eq: {
                                                readonly description: "Equal to";
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                }, {
                                                    readonly type: "number";
                                                }];
                                            };
                                            readonly neq: {
                                                readonly description: "Not equal";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly inc: {
                                                readonly description: "In array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly ninc: {
                                                readonly description: "Not in array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly pre: {
                                                readonly description: "Starts with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly suf: {
                                                readonly description: "Ends with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly re: {
                                                readonly description: "Regex";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly gt: {
                                                readonly description: "Greater than";
                                                readonly type: "number";
                                            };
                                            readonly gte: {
                                                readonly description: "Greater than or equal to";
                                                readonly type: "number";
                                            };
                                            readonly lt: {
                                                readonly description: "Less than";
                                                readonly type: "number";
                                            };
                                            readonly lte: {
                                                readonly description: "Less than or equal to";
                                                readonly type: "number";
                                            };
                                        };
                                    }];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["type", "key"];
                            readonly properties: {
                                readonly type: {
                                    readonly description: "The type of request element to check";
                                    readonly type: "string";
                                    readonly enum: readonly ["header", "cookie", "query"];
                                };
                                readonly key: {
                                    readonly description: "The name of the element contained in the particular type";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                };
                                readonly value: {
                                    readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                    readonly anyOf: readonly [{
                                        readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    }, {
                                        readonly description: "A condition operation object";
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly minProperties: 1;
                                        readonly properties: {
                                            readonly eq: {
                                                readonly description: "Equal to";
                                                readonly anyOf: readonly [{
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                }, {
                                                    readonly type: "number";
                                                }];
                                            };
                                            readonly neq: {
                                                readonly description: "Not equal";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly inc: {
                                                readonly description: "In array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly ninc: {
                                                readonly description: "Not in array";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                            };
                                            readonly pre: {
                                                readonly description: "Starts with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly suf: {
                                                readonly description: "Ends with";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly re: {
                                                readonly description: "Regex";
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                            readonly gt: {
                                                readonly description: "Greater than";
                                                readonly type: "number";
                                            };
                                            readonly gte: {
                                                readonly description: "Greater than or equal to";
                                                readonly type: "number";
                                            };
                                            readonly lt: {
                                                readonly description: "Less than";
                                                readonly type: "number";
                                            };
                                            readonly lte: {
                                                readonly description: "Less than or equal to";
                                                readonly type: "number";
                                            };
                                        };
                                    }];
                                };
                            };
                        }];
                    };
                };
                readonly mitigate: {
                    readonly description: "Mitigation action to take on a route";
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["action"];
                    readonly properties: {
                        readonly action: {
                            readonly description: "The mitigation action to take";
                            readonly type: "string";
                            readonly enum: readonly ["challenge", "deny"];
                        };
                    };
                };
                readonly transforms: {
                    readonly description: "A list of transform rules to adjust a request path, request query parameters, or request/response headers";
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly items: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "op"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The scope of the transform to apply";
                                readonly type: "string";
                                readonly enum: readonly ["request.headers", "request.query", "response.headers", "request.path"];
                            };
                            readonly op: {
                                readonly description: "The operation to perform on the target";
                                readonly type: "string";
                                readonly enum: readonly ["append", "set", "delete"];
                            };
                            readonly target: {
                                readonly description: "The target of the transform";
                                readonly type: "object";
                                readonly required: readonly ["key"];
                                readonly properties: {
                                    readonly key: {
                                        readonly description: "A value to match against. Can be a string or a condition operation object (without regex support)";
                                        readonly anyOf: readonly [{
                                            readonly description: "A valid header name (letters, numbers, hyphens, underscores)";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        }, {
                                            readonly description: "A condition operation object";
                                            readonly type: "object";
                                            readonly additionalProperties: false;
                                            readonly minProperties: 1;
                                            readonly properties: {
                                                readonly eq: {
                                                    readonly description: "Equal to";
                                                    readonly anyOf: readonly [{
                                                        readonly type: "string";
                                                        readonly maxLength: 4096;
                                                    }, {
                                                        readonly type: "number";
                                                    }];
                                                };
                                                readonly neq: {
                                                    readonly description: "Not equal";
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                                readonly inc: {
                                                    readonly description: "In array";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "string";
                                                        readonly maxLength: 4096;
                                                    };
                                                };
                                                readonly ninc: {
                                                    readonly description: "Not in array";
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "string";
                                                        readonly maxLength: 4096;
                                                    };
                                                };
                                                readonly pre: {
                                                    readonly description: "Starts with";
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                                readonly suf: {
                                                    readonly description: "Ends with";
                                                    readonly type: "string";
                                                    readonly maxLength: 4096;
                                                };
                                                readonly gt: {
                                                    readonly description: "Greater than";
                                                    readonly type: "number";
                                                };
                                                readonly gte: {
                                                    readonly description: "Greater than or equal to";
                                                    readonly type: "number";
                                                };
                                                readonly lt: {
                                                    readonly description: "Less than";
                                                    readonly type: "number";
                                                };
                                                readonly lte: {
                                                    readonly description: "Less than or equal to";
                                                    readonly type: "number";
                                                };
                                            };
                                        }];
                                    };
                                };
                            };
                            readonly args: {
                                readonly description: "The arguments to the operation";
                                readonly anyOf: readonly [{
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly maxLength: 4096;
                                    };
                                }];
                            };
                            readonly env: {
                                readonly description: "An array of environment variable names that should be replaced at runtime in the args value";
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly maxItems: 64;
                                readonly items: {
                                    readonly type: "string";
                                    readonly maxLength: 256;
                                };
                            };
                        };
                        readonly allOf: readonly [{
                            readonly if: {
                                readonly properties: {
                                    readonly op: {
                                        readonly enum: readonly ["append", "set"];
                                    };
                                };
                            };
                            readonly then: {
                                readonly required: readonly ["args"];
                            };
                        }, {
                            readonly if: {
                                readonly allOf: readonly [{
                                    readonly properties: {
                                        readonly type: {
                                            readonly enum: readonly ["request.headers", "response.headers"];
                                        };
                                    };
                                }, {
                                    readonly properties: {
                                        readonly op: {
                                            readonly enum: readonly ["set", "append"];
                                        };
                                    };
                                }];
                            };
                            readonly then: {
                                readonly properties: {
                                    readonly target: {
                                        readonly properties: {
                                            readonly key: {
                                                readonly if: {
                                                    readonly type: "string";
                                                };
                                                readonly then: {
                                                    readonly pattern: "^[a-zA-Z0-9_-]+$";
                                                };
                                            };
                                        };
                                    };
                                    readonly args: {
                                        readonly anyOf: readonly [{
                                            readonly type: "string";
                                            readonly pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$";
                                        }, {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly pattern: "^[a-zA-Z0-9_ :;.,\"'?!(){}\\[\\]@<>=+*#$&`|~\\^%/-]+$";
                                            };
                                        }];
                                    };
                                };
                            };
                        }, {
                            readonly if: {
                                readonly required: readonly ["type"];
                                readonly properties: {
                                    readonly type: {
                                        readonly enum: readonly ["request.headers", "request.query", "response.headers"];
                                    };
                                };
                            };
                            readonly then: {
                                readonly required: readonly ["target"];
                            };
                        }, {
                            readonly if: {
                                readonly required: readonly ["type"];
                                readonly properties: {
                                    readonly type: {
                                        readonly enum: readonly ["request.path"];
                                    };
                                };
                            };
                            readonly then: {
                                readonly required: readonly ["args"];
                                readonly not: {
                                    readonly required: readonly ["target"];
                                };
                                readonly properties: {
                                    readonly op: {
                                        readonly enum: readonly ["set"];
                                    };
                                    readonly args: {
                                        readonly description: "The runtime-visible request path. Must be an origin-form path without query or fragment.";
                                        readonly type: "string";
                                        readonly maxLength: 2048;
                                        readonly pattern: "^/(?!/)(?!.*[?#\\s\\x00-\\x1F\\x7F]).*$";
                                    };
                                };
                            };
                        }];
                    };
                };
                readonly env: {
                    readonly description: "An array of environment variable names that should be replaced at runtime in the destination or headers";
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly maxItems: 64;
                    readonly items: {
                        readonly type: "string";
                        readonly maxLength: 256;
                    };
                };
                readonly respectOriginCacheControl: {
                    readonly description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.";
                    readonly type: "boolean";
                };
            };
        }, {
            readonly type: "object";
            readonly deprecated: true;
            readonly required: readonly ["handle"];
            readonly additionalProperties: false;
            readonly properties: {
                readonly handle: {
                    readonly type: "string";
                    readonly maxLength: 32;
                    readonly enum: readonly ["error", "filesystem", "hit", "miss", "resource", "rewrite"];
                };
            };
        }];
    };
};
export declare const rewritesSchema: {
    readonly type: "array";
    readonly maxItems: 2048;
    readonly description: "A list of rewrite definitions.";
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["source", "destination"];
        readonly properties: {
            readonly source: {
                readonly description: "A pattern that matches each incoming pathname (excluding querystring).";
                readonly type: "string";
                readonly maxLength: 4096;
            };
            readonly destination: {
                readonly description: "An absolute pathname to an existing resource, an external URL, or a service-targeted destination object.";
                readonly anyOf: readonly [{
                    readonly type: "string";
                    readonly maxLength: 4096;
                }, {
                    readonly description: "A service-targeted destination that delegates routing into a named service from `services`. Identified by the presence of `service`.";
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["service"];
                    readonly properties: {
                        readonly type: {
                            readonly description: "Optional explicit format marker. The destination shape is identified by the `service` property, so `type` is no longer required. When present it must be `service`.";
                            readonly type: "string";
                            readonly enum: readonly ["service"];
                        };
                        readonly service: {
                            readonly description: "A service name identifier.";
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 64;
                            readonly pattern: "^[a-zA-Z]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$";
                        };
                        readonly path: {
                            readonly description: "Routing-only path used to select a route inside the target service. It does not mutate the URL observed by user code.";
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                    };
                }];
            };
            readonly transforms: {
                readonly description: "A list of request path transforms using path-to-regexp parameters.";
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["type", "op", "args"];
                    readonly properties: {
                        readonly type: {
                            readonly description: "The request path to expose to the target runtime";
                            readonly type: "string";
                            readonly enum: readonly ["request.path"];
                        };
                        readonly op: {
                            readonly description: "Replace the runtime-visible request path";
                            readonly type: "string";
                            readonly enum: readonly ["set"];
                        };
                        readonly args: {
                            readonly description: "An origin-form request path. Route parameters use path-to-regexp syntax such as `/:path*`.";
                            readonly type: "string";
                            readonly maxLength: 2048;
                            readonly pattern: "^/(?!/)(?!.*[?#\\s\\x00-\\x1F\\x7F]).*$";
                        };
                        readonly env: {
                            readonly description: "An array of environment variable names that should be replaced at runtime in the args value";
                            readonly type: "array";
                            readonly minItems: 1;
                            readonly maxItems: 64;
                            readonly items: {
                                readonly type: "string";
                                readonly maxLength: 256;
                            };
                        };
                    };
                };
            };
            readonly has: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            readonly missing: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            readonly statusCode: {
                readonly description: "An optional integer to override the status code of the response.";
                readonly type: "integer";
                readonly minimum: 100;
                readonly maximum: 999;
            };
            readonly env: {
                readonly description: "An array of environment variable names that should be replaced at runtime in the destination";
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 64;
                readonly items: {
                    readonly type: "string";
                    readonly maxLength: 256;
                };
            };
            readonly respectOriginCacheControl: {
                readonly description: "When set to true (default), external rewrites will respect the Cache-Control header from the origin. When false, caching is disabled for this rewrite.";
                readonly type: "boolean";
            };
        };
    };
};
export declare const redirectsSchema: {
    readonly title: "Redirects";
    readonly type: "array";
    readonly maxItems: 2048;
    readonly description: "A list of redirect definitions.";
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["source", "destination"];
        readonly properties: {
            readonly source: {
                readonly description: "A pattern that matches each incoming pathname (excluding querystring) or a full URL including domain.";
                readonly type: "string";
                readonly maxLength: 4096;
            };
            readonly destination: {
                readonly description: "A location destination defined as an absolute pathname or external URL.";
                readonly type: "string";
                readonly maxLength: 4096;
            };
            readonly permanent: {
                readonly description: "A boolean to toggle between permanent and temporary redirect. When `true`, the status code is `308`. When `false` the status code is `307`.";
                readonly type: "boolean";
            };
            readonly statusCode: {
                readonly description: "An optional integer to define the status code of the redirect.";
                readonly private: true;
                readonly type: "integer";
                readonly minimum: 100;
                readonly maximum: 999;
            };
            readonly has: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            readonly missing: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            readonly env: {
                readonly description: "An array of environment variable names that should be replaced at runtime in the destination";
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 64;
                readonly items: {
                    readonly type: "string";
                    readonly maxLength: 256;
                };
            };
        };
    };
};
export declare const headersSchema: {
    readonly type: "array";
    readonly maxItems: 2048;
    readonly description: "A list of header definitions.";
    readonly items: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["source", "headers"];
        readonly properties: {
            readonly source: {
                readonly description: "A pattern that matches each incoming pathname (excluding querystring)";
                readonly type: "string";
                readonly maxLength: 4096;
            };
            readonly headers: {
                readonly description: "An array of key/value pairs representing each response header.";
                readonly type: "array";
                readonly maxItems: 1024;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["key", "value"];
                    readonly properties: {
                        readonly key: {
                            readonly type: "string";
                            readonly maxLength: 4096;
                        };
                        readonly value: {
                            readonly type: "string";
                            readonly maxLength: 32768;
                        };
                    };
                };
            };
            readonly has: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
            readonly missing: {
                readonly description: "An array of requirements that are needed to match";
                readonly type: "array";
                readonly maxItems: 16;
                readonly items: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "value"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["host"];
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["type", "key"];
                        readonly properties: {
                            readonly type: {
                                readonly description: "The type of request element to check";
                                readonly type: "string";
                                readonly enum: readonly ["header", "cookie", "query"];
                            };
                            readonly key: {
                                readonly description: "The name of the element contained in the particular type";
                                readonly type: "string";
                                readonly maxLength: 4096;
                            };
                            readonly value: {
                                readonly description: "A value to match against. Can be a string (regex) or a condition operation object";
                                readonly anyOf: readonly [{
                                    readonly description: "A regular expression used to match thev value. Named groups can be used in the destination.";
                                    readonly type: "string";
                                    readonly maxLength: 4096;
                                }, {
                                    readonly description: "A condition operation object";
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly minProperties: 1;
                                    readonly properties: {
                                        readonly eq: {
                                            readonly description: "Equal to";
                                            readonly anyOf: readonly [{
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            }, {
                                                readonly type: "number";
                                            }];
                                        };
                                        readonly neq: {
                                            readonly description: "Not equal";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly inc: {
                                            readonly description: "In array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly ninc: {
                                            readonly description: "Not in array";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly maxLength: 4096;
                                            };
                                        };
                                        readonly pre: {
                                            readonly description: "Starts with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly suf: {
                                            readonly description: "Ends with";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly re: {
                                            readonly description: "Regex";
                                            readonly type: "string";
                                            readonly maxLength: 4096;
                                        };
                                        readonly gt: {
                                            readonly description: "Greater than";
                                            readonly type: "number";
                                        };
                                        readonly gte: {
                                            readonly description: "Greater than or equal to";
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly description: "Less than";
                                            readonly type: "number";
                                        };
                                        readonly lte: {
                                            readonly description: "Less than or equal to";
                                            readonly type: "number";
                                        };
                                    };
                                }];
                            };
                        };
                    }];
                };
            };
        };
    };
};
export declare const cleanUrlsSchema: {
    readonly description: "When set to `true`, all HTML files and Serverless Functions will have their extension removed. When visiting a path that ends with the extension, a 308 response will redirect the client to the extensionless path.";
    readonly type: "boolean";
};
export declare const trailingSlashSchema: {
    readonly description: "When `false`, visiting a path that ends with a forward slash will respond with a `308` status code and redirect to the path without the trailing slash.";
    readonly type: "boolean";
};
