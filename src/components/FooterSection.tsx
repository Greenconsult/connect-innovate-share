const FooterSection = () => {
  return (
    <footer className="py-12 bg-primary border-t border-gold/10">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-xl font-semibold text-primary-foreground mb-2">
          Research Corner
        </p>
        <p className="text-primary-foreground/50 text-sm font-body mb-6">
          School of Computing &amp; Mathematical Sciences — University of Wolverhampton
        </p>
        <div className="w-12 h-px bg-gold/30 mx-auto mb-6" />
        <p className="text-primary-foreground/30 text-xs font-body">
          © {new Date().getFullYear()} University of Wolverhampton. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
