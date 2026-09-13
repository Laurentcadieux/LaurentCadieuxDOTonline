import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class LaurentVoiceGateway {
  private static final int PORT = envInt("PORT", 8088);
  private static final String API_KEY = env("ELEVENLABS_API_KEY");
  private static final String AGENT_ID = env("ELEVENLABS_AGENT_ID");
  private static final String ACCESS_SECRET = envOrDefault("VOICE_ACCESS_SECRET", "sherpa");
  private static final Pattern SECRET_PATTERN =
      Pattern.compile("\"secret\"\\s*:\\s*\"([^\"]*)\"", Pattern.CASE_INSENSITIVE);
  private static final Pattern SIGNED_URL_PATTERN =
      Pattern.compile("\"signed_url\"\\s*:\\s*\"([^\"]+)\"");

  private LaurentVoiceGateway() {}

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", PORT), 0);
    HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(8)).build();

    server.createContext("/health", exchange -> {
      if (!"GET".equals(exchange.getRequestMethod())) {
        respond(exchange, 405, "{\"error\":\"method_not_allowed\"}");
        return;
      }
      respond(exchange, 200, "{\"ok\":true}");
    });

    server.createContext("/api/voice/session", exchange -> handleSession(exchange, client));
    server.start();
    System.out.printf(Locale.ROOT, "LaurentVoiceGateway listening on 127.0.0.1:%d%n", PORT);
  }

  private static void handleSession(HttpExchange exchange, HttpClient client) throws IOException {
    if ("OPTIONS".equals(exchange.getRequestMethod())) {
      addCors(exchange.getResponseHeaders());
      respond(exchange, 204, "");
      return;
    }
    if (!"POST".equals(exchange.getRequestMethod())) {
      respond(exchange, 405, "{\"error\":\"method_not_allowed\"}");
      return;
    }

    String body = readBody(exchange.getRequestBody());
    String providedSecret = extractSecret(body);
    if (!ACCESS_SECRET.equals(providedSecret)) {
      respond(exchange, 403, "{\"error\":\"access_denied\"}");
      return;
    }

    if (API_KEY.isBlank() || AGENT_ID.isBlank()) {
      respond(exchange, 503, "{\"error\":\"voice_agent_not_configured\"}");
      return;
    }

    String url = "https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id="
        + URLEncoder.encode(AGENT_ID, StandardCharsets.UTF_8);
    HttpRequest request = HttpRequest.newBuilder(URI.create(url))
        .timeout(Duration.ofSeconds(12))
        .header("xi-api-key", API_KEY)
        .GET()
        .build();

    try {
      HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
      if (response.statusCode() < 200 || response.statusCode() >= 300) {
        respond(exchange, 502, "{\"error\":\"elevenlabs_signed_url_failed\"}");
        return;
      }
      String signedUrl = extractSignedUrl(response.body());
      if (signedUrl.isBlank()) {
        respond(exchange, 502, "{\"error\":\"elevenlabs_signed_url_missing\"}");
        return;
      }
      respond(exchange, 200, "{\"signedUrl\":\"" + jsonEscape(signedUrl) + "\"}");
    } catch (InterruptedException error) {
      Thread.currentThread().interrupt();
      respond(exchange, 500, "{\"error\":\"interrupted\"}");
    } catch (Exception error) {
      respond(exchange, 502, "{\"error\":\"voice_gateway_failed\"}");
    }
  }

  private static String readBody(InputStream stream) throws IOException {
    return new String(stream.readAllBytes(), StandardCharsets.UTF_8);
  }

  private static String extractSecret(String body) {
    Matcher matcher = SECRET_PATTERN.matcher(body);
    return matcher.find() ? unescapeJson(matcher.group(1)).trim() : "";
  }

  private static String extractSignedUrl(String body) {
    Matcher matcher = SIGNED_URL_PATTERN.matcher(body);
    return matcher.find() ? unescapeJson(matcher.group(1)) : "";
  }

  private static String env(String name) {
    String value = System.getenv(name);
    return value == null ? "" : value.trim();
  }

  private static String envOrDefault(String name, String fallback) {
    String value = env(name);
    return value.isBlank() ? fallback : value;
  }

  private static int envInt(String name, int fallback) {
    try {
      return Integer.parseInt(envOrDefault(name, Integer.toString(fallback)));
    } catch (NumberFormatException error) {
      return fallback;
    }
  }

  private static void respond(HttpExchange exchange, int status, String body) throws IOException {
    Headers headers = exchange.getResponseHeaders();
    addCors(headers);
    headers.set("Content-Type", "application/json; charset=utf-8");
    byte[] payload = body.getBytes(StandardCharsets.UTF_8);
    if (status == 204) {
      exchange.sendResponseHeaders(status, -1);
      exchange.close();
      return;
    }
    exchange.sendResponseHeaders(status, payload.length);
    try (OutputStream output = exchange.getResponseBody()) {
      output.write(payload);
    }
  }

  private static void addCors(Headers headers) {
    headers.set("Access-Control-Allow-Origin", "https://www.laurentcadieux.online");
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  private static String jsonEscape(String value) {
    return value
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\n", "\\n")
        .replace("\r", "\\r");
  }

  private static String unescapeJson(String value) {
    return value
        .replace("\\\"", "\"")
        .replace("\\\\", "\\")
        .replace("\\/", "/");
  }
}
