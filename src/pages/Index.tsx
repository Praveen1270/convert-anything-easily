import { FileConverter } from '@/components/FileConverter';
import heroImage from '@/assets/hero-converter.jpg';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="File conversion illustration" 
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl" 
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-convert-accent bg-clip-text text-transparent leading-tight">
            Convert Any File
            <br />
            <span className="text-4xl md:text-5xl">Instantly</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your files between formats with our powerful, secure converter. 
            Support for images, documents, text files, and more.
          </p>
        </div>
      </section>

      {/* Converter Section */}
      <section className="py-16 px-4">
        <FileConverter />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Converter?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Convert files in seconds with our optimized processing engine.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border">
              <div className="w-16 h-16 bg-convert-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your files are processed locally in your browser for maximum security.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Free</h3>
              <p className="text-muted-foreground">No subscriptions, no limits. Convert as many files as you need.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
