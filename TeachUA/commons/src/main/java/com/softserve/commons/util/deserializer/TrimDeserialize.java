package com.softserve.commons.util.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

/**
 * Use this class with @JsonDeserialize(using = TrimDeserialize) on DTO field to trim text.
 *
 * @author Roman Klymus
 */
public class TrimDeserialize extends JsonDeserializer<String> {
    @Override
    public String deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException {
        return jsonParser.getText().trim();
    }
}
