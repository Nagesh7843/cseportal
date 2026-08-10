package com.sit.portal.service;

import com.sit.portal.entity.PushSubscription;
import com.sit.portal.repository.PushSubscriptionRepository;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.List;

@Service
public class PushNotificationService {

    @Autowired
    private PushSubscriptionRepository repository;

    private PushService pushService;

    // Hardcoded VAPID keys for demonstration
    private final String PUBLIC_KEY = "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB22Wz9C3b2ZMAk9bA5Yj2zEQ";
    private final String PRIVATE_KEY = "dummy_private_key_replace_with_real_later_or_generate";
    // Actually, nl.martijndwars requires valid keys. Let me generate standard valid ones or generate them dynamically on start.
    // To generate on start:
    private String dynamicPublicKey;
    private String dynamicPrivateKey;

    @PostConstruct
    public void init() throws GeneralSecurityException {
        Security.addProvider(new BouncyCastleProvider());
        
        // Generate keys at runtime
        try {
            java.security.KeyPairGenerator keyPairGenerator = java.security.KeyPairGenerator.getInstance("ECDSA", "BC");
            keyPairGenerator.initialize(new java.security.spec.ECGenParameterSpec("prime256v1"), new java.security.SecureRandom());
            java.security.KeyPair keyPair = keyPairGenerator.generateKeyPair();

            this.dynamicPublicKey = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(
                    nl.martijndwars.webpush.Utils.encode((org.bouncycastle.jce.interfaces.ECPublicKey) keyPair.getPublic())
            );
            this.dynamicPrivateKey = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(
                    nl.martijndwars.webpush.Utils.encode((org.bouncycastle.jce.interfaces.ECPrivateKey) keyPair.getPrivate())
            );
            pushService = new PushService();
            pushService.setPublicKey(keyPair.getPublic());
            pushService.setPrivateKey(keyPair.getPrivate());
            pushService.setSubject("mailto:admin@sit.edu");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getPublicKey() {
        return dynamicPublicKey;
    }

    public void sendPushNotificationToAll(String title, String message) {
        List<PushSubscription> subscriptions = repository.findAll();
        
        String payload = String.format("{\"title\":\"%s\", \"message\":\"%s\"}", title, message);

        for (PushSubscription sub : subscriptions) {
            try {
                Subscription.Keys keys = new Subscription.Keys(sub.getP256dh(), sub.getAuth());
                Subscription subscription = new Subscription(sub.getEndpoint(), keys);
                Notification notification = new Notification(subscription, payload);
                pushService.send(notification);
            } catch (Exception e) {
                System.err.println("Failed to send push notification to " + sub.getEndpoint() + ": " + e.getMessage());
            }
        }
    }
}
