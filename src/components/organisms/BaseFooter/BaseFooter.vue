<script setup lang="ts">
import { Mail } from '@lucide/vue'
</script>

<template>
  <footer
    class="base-footer border-border bg-background flex w-full items-center justify-between border-t px-6"
    role="contentinfo"
  >
    <div class="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="footer-left shrink-0 text-center md:text-left">
        <p class="text-muted-foreground text-sm">
          &copy; {{ new Date().getFullYear() }} vue3-shadcn-universal. All rights reserved.
        </p>
      </div>

      <nav class="footer-center" aria-label="Footer navigation">
        <ul class="flex flex-wrap justify-center gap-6">
          <li>
            <router-link
              to="/privacy"
              class="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy
            </router-link>
          </li>
          <li>
            <router-link
              to="/terms"
              class="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="footer-right shrink-0">
        <div class="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/joshua-alexis-sardido"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <img src="/linkedin.ico" alt="LinkedIn" class="h-5 w-5 rounded" />
          </a>

          <a
            href="https://github.com/ningentsuru"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <img src="/github.ico" alt="GitHub" class="h-5 w-5 rounded-full bg-white" />
          </a>

          <a
            href="mailto:ja.sardido@outlook.com"
            class="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Contact Us"
          >
            <Mail class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <span class="sr-only">
      Site footer with copyright, navigation links, and social media contacts
    </span>
  </footer>
</template>
