# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /home/benachi-abdelouaheb/Downloads/android-sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.kts.

-keep class com.cosmicfood.model.** { *; }
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keep interface retrofit2.** { *; }
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
