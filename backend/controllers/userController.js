exports.getProfile = async (req, res) => {
    try {
      // Logique pour récupérer le profil utilisateur
      res.json({ message: "Profil utilisateur" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    try {
      // Logique pour mettre à jour le profil utilisateur
      res.json({ message: "Profil mis à jour" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };