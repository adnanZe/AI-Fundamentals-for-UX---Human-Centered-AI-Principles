import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  status: 'available' | 'coming-soon';
  principles: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="features-grid">
        @for (feature of features; track feature.route) {
        <div class="feature-card" [class.coming-soon]="feature.status === 'coming-soon'">
          <div class="card-icon">{{ feature.icon }}</div>
          <h2 class="card-title">{{ feature.title }}</h2>

          @if (feature.status === 'available') {
          <a [routerLink]="feature.route" class="card-button"> Try Demo → </a>
          } @else {
          <button class="card-button disabled" disabled>Coming Soon</button>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 24px;
      }

      .hero {
        text-align: center;
        margin-bottom: 60px;
      }

      .hero-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        margin-bottom: 16px;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }

      .hero-subtitle {
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 0.95);
        max-width: 600px;
        margin: 0 auto;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 30px;
      }

      .feature-card {
        background: white;
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }

      .feature-card:not(.coming-soon):hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
      }

      .feature-card.coming-soon {
        opacity: 0.7;
        background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
      }

      .card-icon {
        font-size: 3rem;
        margin-bottom: 16px;
        line-height: 1;
      }

      .card-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 24px;
      }

      .card-button {
        display: inline-block;
        width: 100%;
        padding: 14px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .card-button:not(.disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }

      .card-button.disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .features-grid {
          grid-template-columns: 1fr;
        }

        .hero-title {
          font-size: 2rem;
        }

        .hero-subtitle {
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class HomeComponent {
  protected readonly features: FeatureCard[] = [
    {
      title: 'AI-assisted Form Completion',
      description:
        'Experience how AI can help users complete forms while maintaining full control. Accept, modify, or reject AI suggestions.',
      icon: '✨',
      route: '/ai-form-completion',
      status: 'available',
      principles: ['User Agency', 'Transparency', 'Mental Models', 'Feedback Loops'],
    },
    {
      title: 'Transparent Loading States',
      description:
        'Compare traditional loading spinners with transparent AI process visualization that shows step-by-step progress.',
      icon: '⏳',
      route: '/ai-loading-states',
      status: 'available',
      principles: ['Transparency', 'Mental Models', 'Trust Building', 'Feedback Loops'],
    },
    {
      title: 'AI Action History + Selective Undo',
      description:
        'Track all AI actions with detailed history and selectively undo any specific action for precise control.',
      icon: '📋',
      route: '/action-history',
      status: 'available',
      principles: ['Safety Nets', 'User Agency', 'Transparency', 'Trust Building'],
    },
  ];
}
